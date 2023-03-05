import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import { CATEGORIES_OPTIONS } from "~/utils/constants/categories";

import {
  type CreateTransactionInput,
  createTransactionSchema,
} from "~/utils/schemas/transaction.schema";
import { TRANSACTION_TYPES_OPTIONS } from "~/utils/types/transaction.types";
import { Input } from "../Input";
import { Modal } from "./Modal";

export const CreateTransactionModal = NiceModal.create(() => {
  const modal = useModal();

  const utils = api.useContext();

  const { mutateAsync } = api.transaction.create.useMutation({
    onSuccess: () => {
      toast("Transaction created successfully!", {
        type: "success",
        theme: "dark",
      });
      utils.transaction.getAll.invalidate();
      utils.transaction.stats.invalidate();
      modal.remove();
    },
  });

  const methods = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      date: dayjs(new Date()).format("YYYY-MM-DD"),
    },
  });

  const onSubmit = async (values: CreateTransactionInput) => {
    await mutateAsync(values);
  };

  return (
    <Modal
      isOpen={modal.visible}
      onClose={modal.remove}
      className="min-h-[650px] w-[550px]"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl">Create Transaction</h2>
        </div>

        <div className="flex items-center justify-center">
          <IconX
            size={24}
            onClick={modal.remove}
            aria-label="Close"
            className="cursor-pointer rounded-full p-1 hover:bg-gray-600"
          />
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="my-4">
            <Input.Text
              id="title"
              name="title"
              label="Title"
              placeholder="Title..."
            />
          </div>

          <div>
            <Input.Number
              id="amount"
              name="amount"
              label="Amount"
              placeholder="Amount..."
              defaultValue={0}
            />
          </div>

          <div className="mt-3">
            <Input.Select
              id="type"
              name="type"
              label="Transaction Type"
              options={TRANSACTION_TYPES_OPTIONS}
            />
          </div>

          <div className="mt-3">
            <Input.Select
              id="category"
              name="category"
              label="Category"
              options={CATEGORIES_OPTIONS}
            />
          </div>

          <div className="mt-3">
            <Input.Date id="date" name="date" label="Date" />
          </div>

          <div className="mt-3">
            <Input.Textarea id="note" name="note" label="Note" />
          </div>

          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={modal.remove}
              className="mr-3 rounded-md border border-red-600/60 bg-red-600/10 py-1.5 px-3 text-gray-200 hover:bg-red-600/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md border border-teal-600/60 bg-teal-600/10 py-1.5 px-3 text-gray-200 hover:bg-teal-600/20"
            >
              Create
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
});
