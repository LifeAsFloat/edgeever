export type MigrationGuideCommand = {
  label: string;
  language: "sh" | "powershell";
  code: string;
};

export type MigrationGuideStep = {
  index: string;
  title: string;
  paragraphs?: string[];
  commands?: MigrationGuideCommand[];
  list?: string[];
};

export const EVERNOTE_MIGRATION_GUIDE = {
  title: "印象笔记迁移指引",
  subtitle: "先导出 ENEX，再回 EdgeEver 导入",
  introTitle: "最省事的迁移方式",
  intro: [
    "EdgeEver 只导入 .enex 文件。先用 evernote-backup 从印象笔记导出 ENEX，再回到这里选择文件导入。",
  ],
  steps: [
    {
      index: "1",
      title: "用 evernote-backup 导出 ENEX",
      paragraphs: ["根据你的电脑系统选择一组命令执行。"],
      commands: [
        {
          label: "macOS / Linux",
          language: "sh",
          code: `pipx install evernote-backup
evernote-backup init-db --backend china
evernote-backup sync
evernote-backup export ./edgeever-import`,
        },
        {
          label: "Windows PowerShell",
          language: "powershell",
          code: `py -m pip install --user pipx
py -m pipx ensurepath
pipx install evernote-backup
evernote-backup init-db --backend china
evernote-backup sync
evernote-backup export .\\edgeever-import`,
        },
      ],
      list: [
        "如果 Windows 执行 `py -m pipx ensurepath` 后提示修改了 PATH，请关闭并重新打开 PowerShell，再继续执行后面的命令。",
        "完成后，当前目录会出现 `edgeever-import` 文件夹，里面是一批 `.enex` 文件。通常一个笔记本对应一个 `.enex` 文件。",
        "只想导出部分笔记本时，可以在最后一行加上笔记本名。",
      ],
    },
    {
      index: "1.1",
      title: "只导出部分笔记本",
      commands: [
        {
          label: "macOS / Linux",
          language: "sh",
          code: `evernote-backup export ./edgeever-import --notebook "工作项目"`,
        },
        {
          label: "Windows PowerShell",
          language: "powershell",
          code: `evernote-backup export .\\edgeever-import --notebook "工作项目"`,
        },
      ],
    },
    {
      index: "2",
      title: "回到 EdgeEver 导入",
      list: [
        "回到“我的”页面里的“导入印象笔记”。",
        "点击“选择文件”，选择 `edgeever-import` 里的 `.enex` 文件。",
        "确认导入计划里的笔记本数量和笔记数量。",
        "点击“开始导入”。",
        "每导完一个笔记本，先检查结果，再点击“确认结果，继续下一个”。",
      ],
    },
    {
      index: "3",
      title: "如果遇到问题",
      list: [
        "EdgeEver 只支持 `.enex`，不支持印象笔记新版 `.notes`。",
        "如果导入中断，先检查最后一个已导入的笔记本，避免重复导入。",
        "EdgeEver 会校验原始创建时间和修改时间；时间不一致时会停止导入。",
        "图片和附件当前会保留为资源占位链接，重要附件建议迁移后抽查。",
      ],
    },
  ] satisfies MigrationGuideStep[],
};
