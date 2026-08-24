import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrainIcon, SendIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});
export default function ChatbotTextarea({
  sendMessage,
  isThinking,
  setIsThinking,
}: {
  sendMessage: (message: string) => void;
  isThinking: boolean;
  setIsThinking: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    sendMessage(data.message);
    form.reset();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(form.getValues());
    }
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col bg-secondary rounded-2xl p-2"
    >
      <Controller
        control={form.control}
        name="message"
        render={({ field }) => (
          <Field>
            <textarea
              {...field}
              id="form-message"
              placeholder="Ask AI Advisor here"
              autoComplete="off"
              onKeyDown={handleKeyDown}
              className="h-16 resize-none rounded-md px-3 py-2 focus:outline-none"
            />
          </Field>
        )}
      />
      <div className="flex items-center justify-between">
        <div>
          <Toggle
            size="sm"
            variant="outline"
            pressed={isThinking}
            onPressedChange={setIsThinking}
            className={cn("text-xs px-0 py-0 h-8 w-8 cursor-pointer", {
              "bg-primary/10!": isThinking,
            })}
          >
            <BrainIcon />
          </Toggle>
        </div>
        <div>
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="text-primary hover:bg-primary/10 disabled:bg-transparent hover:text-primary cursor-pointer"
          >
            <SendIcon className="size-5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
