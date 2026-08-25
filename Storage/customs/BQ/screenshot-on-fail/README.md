# Screenshot On Fail

节点级截图 Sink，每个识别节点完成时自动截图保存，用于调试和排查问题。

## 设计动机

在 MaaFramework 开发中，部分开发者会使用 `on_error` 来承载业务逻辑（而非仅用于错误处理），这会导致 Pipeline 节点失败时无法触发默认的截图保存行为。当用户提交 bug 反馈时，开发者往往拿不到失败时的运行截图，只能靠日志猜测问题，排查效率极低。

本 Sink 绕过 `on_error` 机制，直接监听每个 Pipeline 节点的识别完成事件，**无论节点成功还是失败都会截图**，确保开发者始终能拿到完整的运行过程截图，大幅提升问题排查效率。

## 功能

- 每个 Pipeline 节点识别完成时自动截图保存（无论成功或失败）
- 截图保存为 JPG 格式（如 cv2 不可用则回退为 BMP）
- 截图文件名包含时间戳、节点名、识别 ID 和状态信息
- 最多保留 300 张截图，环形覆盖旧图，避免磁盘空间无限增长

## 截图保存路径

```
debug/screenshots/{年}.{月}.{日}-{时}.{分}.{秒}.{毫秒}_{节点名}_{识别ID}_{failed|success}.jpg
```

可通过环境变量 `MDNA_DEBUG_DIR` 自定义 debug 目录路径。

## 文件

- `maahub_meta.json`: 组件元数据
- `README.md`: 使用说明
- `main.py`: 入口文件，导入 Sink 模块即可自动注册
- `screenshot_on_fail.py`: Sink 核心实现
- `pipeline.json`: 空 Pipeline（Sink 组件无需 Pipeline 配置）

## 使用方法

1. 将本文件夹复制到你的 MaaFramework 项目的 `agent/custom/sink/` 目录下
2. 确保已安装依赖：`pip install numpy opencv-python`
3. 在你的 `main.py` 中导入模块：

```python
from agent.custom.sink.screenshot_on_fail import NodeScreenshotSink
```

或者直接运行本文件夹的 `main.py` 作为入口。

## 依赖

- `numpy`
- `opencv-python`（可选，不可用时自动回退 BMP 格式）
