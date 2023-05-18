import useData from "@/context/media";
import { appendToJSONFile } from "@/lib/json";
import { Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import fs from "fs";
import path from "path";
import { customAlphabet } from "nanoid";

export default function FullScreenDropzone() {
  const theme = useMantineTheme();
  const { refresh } = useData();
  return (
    <Dropzone.FullScreen
      active={true}
      accept={[
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/avif",
        "video/mp4",
        "video/x-m4v",
      ]}
      onDrop={async (files) => {
        await Promise.all(
          files.map(async (file) => {
            const id = customAlphabet("1234567890abcdef", 10)();
            const type = file?.type.includes("image") ? "image" : "video";
            const relative = `./media/${type}/${id}-${file?.name}`;
            const absolute = path.resolve(relative);
            const metadata = {
              id,
              name: file?.name
                ?.split(".")
                .slice(0, file?.name?.split(".")?.length - 1)
                .join(""),
              path: absolute,
              size: file?.size / (1024 * 1024),
              label: type,
              date: new Date().getTime(),
              format:
                file?.name?.split(".")?.[file?.name?.split(".")?.length - 1],
              category: "unknown",
              status: "backlog",
            };
            fs.copyFile(file?.path, relative, (err) => {});
            appendToJSONFile("./media/index.json", metadata);
          })
        );
        setTimeout(() => {
          refresh();
        }, 1000);
      }}
    >
      <Group
        position="center"
        spacing="xl"
        mih={450}
        sx={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone.FullScreen>
  );
}
