import { useThunkDispatch } from "@/shared/lib/redux";
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
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { submitPageModel } from "./model";

export const SubmitPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [radioValue, setRadioValue] = useState("option1");
  const [dateValue, setDateValue] = useState<string | null>("12.10.2024");

  const removeFile = () => {
    setSelectedFile(null);
  };

  const placeOfBornOptions = useSelector(
    submitPageModel.selectors.selectBirthPlaces
  );
  const organizations = useSelector(
    submitPageModel.selectors.selectOrganizations
  );
  const documents = useSelector(submitPageModel.selectors.selectDocuments);
  // const loading = useSelector(submitPageModel.selectors.selectLoading);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(submitPageModel.actions.load());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="bg-gray-50 min-h-screen">
      <Container size="xl" py="xl" component="form">
        <Stack gap="xl">
          {/* Radio Group Section */}
          <Paper shadow="xs" p="xl" radius="md">
            <Radio.Group value={radioValue} onChange={setRadioValue}>
              <Stack gap="sm">
                {placeOfBornOptions.map((option) => (
                  <Radio.Card
                    className={clsx(
                      "data-[checked]:border-[var(--mantine-primary-color-filled)]"
                    )}
                    radius="md"
                    value={option.id.toString()}
                    key={option.id}
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
          </Paper>

          {/* Form Section */}
          <Paper shadow="xs" p="xl" radius="md">
            <Title order={3} mb="xl" size="lg">
              Dogluş hakynda lukmançylyk şahadatnamasy
            </Title>

            <Stack gap="xl">
              {/* First Row - Document Type, Date, Number */}
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Çaganyň dogluşyny tassyklaýan resminamasy
                    </Text>
                    <Select
                      placeholder="Dogluş hakynda lukmançylyk şahadatnamasy"
                      defaultValue="birth-certificate"
                      data={documents.map((document) => ({
                        value: document.id.toString(),
                        label: document.label,
                      }))}
                      rightSection={<IconChevronDown size={16} />}
                    />
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Berlen wagty
                    </Text>
                    <DateInput
                      value={dateValue}
                      onChange={setDateValue}
                      valueFormat="DD.MM.YYYY"
                      placeholder="DD.MM.YYYY"
                      leftSection={<IconCalendarWeek size={16} />}
                    />
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Nomeri
                    </Text>
                    <NumberInput
                      defaultValue="2452"
                      leftSection={<IconNumber size={16} />}
                      hideControls
                    />
                  </Stack>
                </Grid.Col>
                {/* Document Issuer */}
                <Grid.Col span={12}>
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Resminamany beren edaranyň ady
                    </Text>
                    <Select
                      placeholder="M.Garrýýew ad. TDLUEÇSOÝM"
                      defaultValue="medical-center"
                      data={organizations.map((organization) => ({
                        value: organization.id.toString(),
                        label: organization.label,
                      }))}
                      rightSection={<IconChevronDown size={16} />}
                      comboboxProps={{
                        withinPortal: false,
                        keepMounted: true,
                      }}
                    />
                  </Stack>
                </Grid.Col>

                {/* File Upload */}
                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                  <Stack gap="md">
                    <FileButton
                      onChange={setSelectedFile}
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
                    {selectedFile && (
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
                                {selectedFile.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {Math.round(selectedFile.size / 1024)}kb
                              </Text>
                            </Stack>
                          </Group>
                          <ActionIcon
                            variant="light"
                            color="gray"
                            onClick={removeFile}
                            radius="xl"
                            size="xs"
                          >
                            <IconX size={12} />
                          </ActionIcon>
                        </Group>
                      </Paper>
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        </Stack>

        {/* Action Buttons */}
        <Group justify="start" mt="xl">
          <Button
            variant="outline"
            size="md"
            px="xl"
            leftSection={<IconChevronLeft />}
            color="green"
            radius={"md"}
          >
            Yza
          </Button>
          <Button
            color="green"
            size="md"
            px="xl"
            rightSection={<IconChevronRight />}
            radius={"md"}
          >
            Dowam et
          </Button>
        </Group>
      </Container>
    </Box>
  );
};
