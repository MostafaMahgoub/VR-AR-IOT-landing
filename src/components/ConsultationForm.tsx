"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function MergedConsultationForm({ onSuccess }: { onSuccess?: () => void }) {
  const t = useTranslations("consultationForm");
  
  const mergedSchema = z.object({
    name: z.string().min(2, t("validation.nameRequired")),
    phone: z.string().min(10, t("validation.phoneRequired")),
    email: z.string().email(t("validation.emailInvalid")),
    position: z.string().optional(),
    companyName: z.string().optional(),
    stationsCount: z.string().optional(),
    pumpsPerStation: z.string().optional(),
    nozzlesPerPump: z.string().optional(),
    tanksCount: z.string().optional(),
    wantDemo: z.string().optional(),
    message: z.string().optional(),
  });

  type MergedFormValues = z.infer<typeof mergedSchema>;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<MergedFormValues>({
    resolver: zodResolver(mergedSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      position: "",
      companyName: "",
      stationsCount: "",
      pumpsPerStation: "",
      nozzlesPerPump: "",
      tanksCount: "",
      wantDemo: "",
      message: "",
    },
  });

  async function onSubmit(data: MergedFormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        onSuccess?.();
        setTimeout(() => setIsSubmitted(false), 10000);
      } else {
        console.error(result.error);
        toast.error(t("errors.submissionError.title"), {
          description: t("errors.submissionError.description"),
        });
      }
    } catch (error) {
      console.error("Failed to send:", error);
      toast.error(t("errors.sendFailed.title"), {
        description: (error as Error).message || t("errors.sendFailed.description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">
            {t("success.title")}
          </h3>
          <p className="text-gray-600">
            {t("success.description")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col flex-grow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.name.label")} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.name.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.phone.label")} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.phone.placeholder")}
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.email.label")} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.email.placeholder")}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.position.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.position.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.companyName.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.companyName.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="stationsCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.stationsCount.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.stationsCount.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name="pumpsPerStation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.pumpsPerStation.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.pumpsPerStation.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name="nozzlesPerPump"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.nozzlesPerPump.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.nozzlesPerPump.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanksCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.tanksCount.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.tanksCount.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="wantDemo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.wantDemo.label")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("fields.wantDemo.placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">
                          {t("fields.wantDemo.options.yes")}
                        </SelectItem>
                        <SelectItem value="no">
                          {t("fields.wantDemo.options.no")}
                        </SelectItem>
                        <SelectItem value="maybe">
                          {t("fields.wantDemo.options.maybe")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>{t("fields.message.label")}</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px]"
                        placeholder={t("fields.message.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-auto bg-[#f3822c] hover:bg-[#d66f25]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  {t("submit.loading")}
                </>
              ) : (
                t("submit.button")
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
