import { Command } from "commander";
import { onCreate } from "../command/create";

const cmd = new Command();

cmd
  .command("create")
  .description("创建一个组件模板或配置文件")
  .option("-t --type <type>", "创建类型，可选值：component, lib-entry")
  .action(onCreate as any);

cmd.parse();
