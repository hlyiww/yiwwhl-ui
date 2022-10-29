import * as inquirer from "inquirer";
import createComponent from "../shared/create-component";
import { red } from "kolorist";

const CHOICES_MAP = {
  CREATE_TYPES: ["component", "lib-entry"],
  DOCS_CATEGORIES: ["通用", "导航", "反馈", "数据录入", "数据显示"],
};

export async function onCreate(args = { type: "" }) {
  let { type } = args;
  if (!type) {
    const result = await inquirer.prompt([
      {
        name: "type",
        type: "list",
        message: "（必填）请选择创建类型：",
        choices: CHOICES_MAP["CREATE_TYPES"],
        default: 0,
      },
    ]);
    type = result.type;
  }
  if (!CHOICES_MAP.CREATE_TYPES.includes(type)) {
    console.log(
      red(
        `当前类型仅支持 ${CHOICES_MAP.CREATE_TYPES.join(
          "、",
        )}，而你的输入是 ${type}，请重新输入`,
      ),
    );
    return onCreate();
  }
  try {
    switch (type) {
      case "component":
        const info = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "（必填）请输入组件名称，用于创建文件夹",
            validate(value) {
              if (value.trim() === "") {
                return "组件 name 不能为空！";
              }
              return true;
            },
          },
          {
            name: "title",
            type: "input",
            message: "（必填）请输入组件的中文名称，用于创建文档",
            validate(value) {
              if (value.trim() === "") {
                return "组件名称不能为空！";
              }
              return true;
            },
          },
          {
            name: "category",
            type: "list",
            message: "（必选）请选择组件的分类，将用作文档列表的分类",
            choices: CHOICES_MAP.DOCS_CATEGORIES,
            default: 0,
          },
        ]);
        createComponent(info);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(red(error));
  }
}
