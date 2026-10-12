declare module "virtual:starlight-page-context-action-config" {
  const config: {
    prompt: string;
    position: "above-toc" | "below-toc";
    layout: "spread" | "compact";
    sticky: boolean;
    llmsTxt: boolean;
    actions: {
      copy: boolean;
      viewMarkdown: boolean;
      chatgpt: boolean;
      claude: boolean;
      t3chat: boolean;
      scrollTop: boolean;
    };
  };
  export default config;
}
