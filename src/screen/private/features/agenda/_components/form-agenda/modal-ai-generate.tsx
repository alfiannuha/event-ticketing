import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SimpleMDE from "easymde";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Sparkles } from "lucide-react";
import aiChatServices from "@/services/ai_chat";
import { toast } from "sonner";

interface FormAiGenerate {
  prompt: string;
  results: string;
}

interface Props {
  onResultsGenerate: (formData: FormAiGenerate) => void;
  defaultPrompt: string;
  editedData?: FormAiGenerate;
  onClose: () => void;
  isOpen: boolean;
}

const ModalAiGenereted = (props: Props) => {
  const { isOpen, defaultPrompt, onResultsGenerate, onClose } = props;

  const [prompDefault, sePropmtDefault] = useState(defaultPrompt);

  const [isGenetatedFromAI, setIsGenetatedFromAI] = useState(false);

  const formSchema = z.object({
    prompt: z.string().nonempty("Prompt tidak boleh kosong"),
    results: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: prompDefault,
      results: "",
    },
  });

  useEffect(() => {
    sePropmtDefault(defaultPrompt);
    form.setValue("prompt", defaultPrompt);
  }, [defaultPrompt]);

  const SimpleMdeReact = dynamic(
    () => import("react-simplemde-editor").then((mod) => mod.default),
    { ssr: false }
  );

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, [form.getValues("results")]);

  const onHandleGenerateAi = (data: FormAiGenerate) => {
    onResultsGenerate(data);
  };

  const disablegenerateAI = useMemo(() => {
    if (!form.getValues("prompt")) return true;

    return false;
  }, [form.watch()]);

  const generateAI = async () => {
    setIsGenetatedFromAI(true);

    await aiChatServices
      .geminiAIChat({
        content: form.getValues("prompt"),
      })
      .then((results) => {
        setIsGenetatedFromAI(false);
        form.setValue(
          "results",
          results.data.candidates[0].content.parts[0].text
        );
      })
      .catch((error) => {
        setIsGenetatedFromAI(false);
        toast.error(error.response.data.error);
      });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Tambah Tipe Tiket</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onHandleGenerateAi)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={form.getValues("prompt").split("\n").length + 1}
                        placeholder="Masukkan prompt untuk melakukan generate menggunakan AI"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="results"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-end">
                      <div></div>
                      <div>
                        Results
                        <div className="text-xs mt-1 italic text-red-500">
                          Periksa kembali Results Anda sebelum menyimpan data
                        </div>
                      </div>
                      <Button
                        disabled={disablegenerateAI}
                        size={"sm"}
                        type="button"
                        onClick={() => generateAI()}
                      >
                        {isGenetatedFromAI ? (
                          <div className="flex justify-start items-center gap-3">
                            <LoaderCircle className="animate-spin w-4 h-4" />
                            Generating Results
                          </div>
                        ) : (
                          <>
                            <Sparkles className="mr-2 w-4 h-4" />
                            Generate Results with AI
                          </>
                        )}
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <SimpleMdeReact
                        data-testid="autofocus-no-spellchecker-editor"
                        options={autofocusNoSpellcheckerOptions}
                        {...field}
                        value={form.getValues("results")}
                        onChange={(value) => {
                          form.setValue("results", value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    onClose();
                  }}
                >
                  Batal
                </Button>
                <Button type="submit">Simpan Data</Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalAiGenereted;
