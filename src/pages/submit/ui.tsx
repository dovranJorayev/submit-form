import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  FileButton,
  Grid,
  Group,
  NumberInput,
  Paper,
  Radio,
  Select,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useThunkDispatch } from "@shared/lib/redux";
import {
  IconCalendarWeek,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconFile,
  IconNumber,
  IconPaperclip,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { submitFormSchema, submitPageModel } from "./model";

export const SubmitPage = () => {
  const dispatch = useThunkDispatch();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      placeOfBirth: 1,
      documentType: 1,
      issuedDate: "12.10.2024",
      documentNumber: "2452",
      issuingOrganization: 1,
      file: undefined as File | undefined,
    },
    validate: zodResolver(submitFormSchema),
  });

  const placeOfBornOptions = useSelector(
    submitPageModel.selectors.selectBirthPlaces
  );
  const organizations = useSelector(
    submitPageModel.selectors.selectOrganizations
  );
  const documents = useSelector(submitPageModel.selectors.selectDocuments);
  const loading = useSelector(submitPageModel.selectors.selectLoading);
  const submitting = useSelector(submitPageModel.selectors.selectSubmitting);

  const handleSubmit = form.onSubmit(async (values) => {
    const validationResult = form.validate();
    if (validationResult.hasErrors) return;
    await dispatch(submitPageModel.actions.submit(values));
  });
  const handleRemove = () => {
    form.setFieldValue("file", undefined);
  };

  const handleFileUpload = (file: File | null) => {
    form.setFieldValue("file", file || undefined);
  };

  useEffect(() => {
    dispatch(submitPageModel.actions.load());
  }, [dispatch]);

  return (
    <Container size="xl" py="xl" className="bg-gray-50 min-h-screen">
      <form id="submit-form" onSubmit={handleSubmit}>
        <Stack gap="xl">
          <Paper shadow="xs" p="xl" radius="md">
            <Radio.Group
              key={form.key("placeOfBirth")}
              {...form.getInputProps("placeOfBirth")}
            >
              <Stack gap="sm" mb="xs">
                {placeOfBornOptions.map((option) => (
                  <Radio.Card
                    radius="md"
                    value={option.id.toString()}
                    key={option.id}
                    className={clsx({
                      "border-red-500": form.errors.placeOfBirth,
                    })}
                  >
                    <Group
                      wrap="nowrap"
                      className="flex items-center px-2 py-1"
                      gap={10}
                    >
                      <Radio.Indicator size="xs" color="green" />
                      <div>
                        <Text size="sm">{option.label}</Text>
                      </div>
                    </Group>
                  </Radio.Card>
                ))}
              </Stack>
            </Radio.Group>

            {loading && (
              <Stack gap="xs" mb="xs">
                <Skeleton height={28} />
                <Skeleton height={28} />
                <Skeleton height={28} />
              </Stack>
            )}
          </Paper>

          <Paper shadow="xs" p="xl" radius="md">
            <Title order={3} mb="xl" size="lg">
              Dogluş hakynda lukmançylyk şahadatnamasy
            </Title>

            <Stack gap="xl">
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Çaganyň dogluşyny tassyklaýan resminamasy
                    </Text>
                    <Select
                      placeholder="Resminamanyň görnüşi"
                      data={documents.map((document) => ({
                        value: document.id.toString(),
                        label: document.label,
                      }))}
                      rightSection={<IconChevronDown size={16} />}
                      key={form.key("documentType")}
                      {...form.getInputProps("documentType")}
                    />
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Berlen wagty
                    </Text>
                    <DateInput
                      valueFormat="DD.MM.YYYY"
                      placeholder="DD.MM.YYYY"
                      leftSection={<IconCalendarWeek size={16} />}
                      key={form.key("issuedDate")}
                      {...form.getInputProps("issuedDate")}
                    />
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Nomeri
                    </Text>
                    <NumberInput
                      leftSection={<IconNumber size={16} />}
                      hideControls
                      key={form.key("documentNumber")}
                      {...form.getInputProps("documentNumber")}
                    />
                  </Stack>
                </Grid.Col>
                {/* Document Issuer */}
                <Grid.Col span={12}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Beriji edaranyň ady
                    </Text>
                    <Select
                      placeholder="Resminamany beren edaranyň ady"
                      data={organizations.map((organization) => ({
                        value: organization.id.toString(),
                        label: organization.label,
                      }))}
                      rightSection={<IconChevronDown size={16} />}
                      comboboxProps={{
                        withinPortal: false,
                        keepMounted: true,
                      }}
                      key={form.key("issuingOrganization")}
                      {...form.getInputProps("issuingOrganization")}
                    />
                  </Stack>
                </Grid.Col>

                {/* File Upload */}
                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                  <Stack gap="md">
                    <FileButton
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    >
                      {(props) => (
                        <Paper
                          {...props}
                          className="border-2 border-dashed border-[#339af0] bg-transparent cursor-pointer min-h-[10px]"
                          p="10"
                          radius="md"
                        >
                          <Center className="h-full">
                            <Group align="center" gap="sm">
                              <IconPaperclip size={16} color="#339af0" />
                              <Text c="#339af0" fw={500} size="sm">
                                Resminamany ýükle
                              </Text>
                            </Group>
                          </Center>
                        </Paper>
                      )}
                    </FileButton>

                    {/* Selected File Display */}
                    {form.getValues().file && (
                      <Paper
                        p="md"
                        radius="md"
                        className="bg-gray-50 border border-gray-200"
                      >
                        <Group justify="space-between" align="center">
                          <Group align="center" gap="md">
                            <Box className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                              <IconFile size={16} color="#fa5252" />
                            </Box>
                            <Stack gap={2}>
                              <Text size="sm" fw={500}>
                                {form.getValues().file?.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {form.getValues().file
                                  ? Math.round(
                                      form.getValues().file!.size / 1024
                                    )
                                  : 0}
                                kb
                              </Text>
                            </Stack>
                          </Group>
                          <ActionIcon
                            variant="light"
                            color="gray"
                            onClick={handleRemove}
                            radius="xl"
                            size="xs"
                          >
                            <IconX size={12} />
                          </ActionIcon>
                        </Group>
                      </Paper>
                    )}
                    {form.errors.file && (
                      <Text size="sm" c="red">
                        {form.errors.file}
                      </Text>
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </form>

      <Group justify="start" mt="xl">
        <Button
          variant="outline"
          size="md"
          px="xl"
          leftSection={<IconChevronLeft />}
          color="green"
          radius={"md"}
          type="button"
        >
          Yza
        </Button>
        <Button
          color="green"
          size="md"
          px="xl"
          rightSection={<IconChevronRight />}
          radius={"md"}
          type="submit"
          loading={submitting}
          form="submit-form"
        >
          Dowam et
        </Button>
      </Group>
    </Container>
  );
};

export default SubmitPage;
