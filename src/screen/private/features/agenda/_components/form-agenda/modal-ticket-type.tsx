import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface FormTicketType {
  index?: string | number;
  name: string;
  description: string;
  price: string | number;
  total: string | number;
}

interface Props {
  onAddTicketType: (formData: FormTicketType) => void;
  editedData?: FormTicketType;
  onClose: () => void;
  isOpen: boolean;
}

export default function ModalTicketType(props: Props) {
  const { isOpen, editedData, onAddTicketType, onClose } = props;

  const form = useForm<FormTicketType>({
    defaultValues: {
      index: "",
      name: "",
      description: "",
      price: "",
      total: "",
    },
  });

  useEffect(() => {
    form.reset({
      index: editedData?.index,
      name: editedData?.name || "",
      description: editedData?.description || "",
      price: editedData?.price.toString() || "",
      total: editedData?.total || "",
    });
  }, [editedData]);

  const onHandleAddTicketType = (formData: any) => {
    const dataTicketType = {
      ...formData,
      price: parseInt(formData.price.replace(/,/g, "")),
      total: parseInt(formData.total),
    };

    console.log("dataTicketType", dataTicketType);

    onAddTicketType(dataTicketType);

    form.reset();
    onClose();
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
              onSubmit={form.handleSubmit(onHandleAddTicketType)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Tiket</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tuliskan nama tiket disini"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deksripsi Tiket</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tuliskan deskripsi tiket disini"
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Tiket</FormLabel>
                    <FormControl>
                      <NumericFormat
                        className="flex w-full px-3 h-10 disabled:bg-slate-200 rounded-md placeholder-[#98A2B3] border border-input bg-background py-2 text-sm font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm placeholder:font-[400] file:font-normal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tuliskan harga tiket disini"
                        thousandSeparator=","
                        allowNegative={false}
                        {...field}
                      />
                      {/* <Input
                        placeholder="Tuliskan harga tiket disini"
                        {...field}
                        required
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Tiket</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tuliskan total tiket disini"
                        {...field}
                        required
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
}
