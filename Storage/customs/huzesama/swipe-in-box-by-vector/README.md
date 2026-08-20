# ONNX Detect IoU

## 功能

- 根据识别到的Box向指定方向滑动

## 文件说明

- `swipe_inBoxByVector.py`：Action 实现
- `pipeline.json`：pipeline 示例

## 使用方式

`custom_action_param` 参数：

- `node_name`：节点命中且有识别结果box的节点名（可选）；默认使用当前动作节点自身的识别结果
- `vector`: 滑动向量（必填）：`[int,"xx%"]`支持含%的字符串，例如`[0,"10%"]`则为向下滑动10% Box 边长的像素长度
- `duration`: 滑动耗时（可选）。默认：`200`ms
- `random_begin`: 随机起点。布尔值。不随机时选取box中点为起点。默认：`False`

示例可见 `pipeline.json`。

## 依赖

- Python
- MaaFramework Agent SDK（`maa.custom_action`）
- onnx runtime
