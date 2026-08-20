# ONNX Detect IoU

## 功能

- 基于IoU的神经网络检测，更易于检测被大目标覆盖的小目标

## 文件说明

- `onnxDetect.py`：Recognition 实现
- `pipeline.json`：pipeline 示例

## 使用方式

使用方式与内置的recognition相似

`custom_recognition_param` 参数：

- `model`：基于py文件所在目录为根目录（可选）：`../model/detect.onnx`
- `expected`: 支持输入label字符串（必填）：`[int,"str"]`
- `conf_threshold`: 置信度（可选）。默认：`0.75`
- `iou_threshold`: 交并比（可选）。默认：`0.25`
- `label`: 默认从onnx文件读取，以数组的形式输入（可选）：`["label1","label2",...]`
- `order_by`: 排序方式（可选）。支持`Horizontal|Vertical|Score|Area|Random|Expected`，与内置神经网络检测类似的排序。默认`Score`
- `index`: 输出索引结果（可选）。默认：`0`

示例可见 `pipeline.json`。

## 依赖

- Python
- MaaFramework Agent SDK（`maa.custom_recognition`）
- onnx runtime

## Files

- `maahub_meta.json`: website metadata
- `README.md`: contributor-facing overview
- `main.py`: example entry file
