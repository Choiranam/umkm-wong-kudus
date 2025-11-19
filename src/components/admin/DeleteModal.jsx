import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  icon = "mdi:alert-outline",
  iconColor = "text-red-600",
  iconBg = "bg-red-100",
  confirmText = "Konfirmasi",
  confirmColor = "bg-red-600 hover:bg-red-700",
  cancelText = "Batal",
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
                  >
                    <Icon icon={icon} className={`h-6 w-6 ${iconColor}`} />
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                </div>

                <p className="mt-4 text-sm text-gray-500">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>

                  <button
                    type="button"
                    className={`px-4 py-2 text-white rounded-lg ${confirmColor}`}
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
