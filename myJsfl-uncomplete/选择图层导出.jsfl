function exportSelectedLayers() {
    // 获取当前文档
    var doc = fl.getDocumentDOM();
    if (!doc) {
        alert("请打开一个文档。");
        return;  // 确保在函数内部
    }

    // 获取所有图层
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var selectedLayers = [];

    // 存储原始图层的类型
    var originalTypes = [];
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].layerType === "normal") {  // 仅处理普通图层
            var includeLayer = confirm("是否导出图层: " + layers[i].name + "?");
            if (includeLayer) {
                selectedLayers.push(i);  // 将选择的图层添加到数组
            }
            originalTypes[i] = layers[i].layerType;  // 存储原始图层类型
        }
    }

    if (selectedLayers.length === 0) {
        alert("未选择任何图层。");
        return;  // 确保在函数内部
    }

    // 选择导出格式
    var exportFormat = confirm("是否导出为 SWF 文件？\n选择“确定”导出为 SWF，选择“取消”导出为 PNG 序列。\n ");

    // 询问用户是将选中的图层合并导出还是分别导出
    var exportOption = confirm("是否将所有选中的图层合并导出？\n选择“确定”合并导出，选择“取消”分别导出。\n ");

    if (exportOption) {
        // 合并导出逻辑
        for (var i = 0; i < layers.length; i++) {
            if (selectedLayers.indexOf(i) === -1) {
                layers[i].layerType = "guide";  // 将未选中的图层设为引导层
            }
        }

        // 选择导出路径
        var filePath = fl.browseForFileURL("save", exportFormat ? "导出 SWF" : "导出 PNG 序列", exportFormat ? "SWF files:*.swf" : "PNG files:*.png");
        if (!filePath) {
            alert("导出已取消。");
            return;  // 确保在函数内部
        }

        if (exportFormat) {
            // 导出 SWF 文件
            doc.exportSWF(filePath, true);
            alert("SWF 已成功导出到: " + filePath);
        } else {
            // 导出为 PNG 序列
            var saveDir = fl.browseForFolderURL("选择一个文件夹以保存导出的 PNG 文件:");
            if (!saveDir) {
                alert("导出已取消。");
                return;  // 确保在函数内部
            }

            var frameCount = timeline.frames.length;
            var exportFolder = saveDir + "/PNG_Sequence/";
            FLfile.createFolder(exportFolder);  // 创建文件夹
            for (var j = 0; j < frameCount; j++) {
                doc.gotoAndStop(j + 1);  // 跳到每一帧
                var pngFilePath = exportFolder + "frame" + (j + 1) + ".png";
                doc.exportToPNG(pngFilePath);  // 导出为 PNG 文件
                fl.trace("导出: " + pngFilePath);  // 输出到控制台
            }
            alert("已成功合并导出 PNG 序列到: " + exportFolder);
        }

    } else {
        // 分别导出每个选中的图层
        var saveDir = fl.browseForFolderURL("选择一个文件夹以保存导出的文件:");
        if (!saveDir) {
            alert("导出已取消。");
            return;  // 确保在函数内部
        }

        for (var i = 0; i < layers.length; i++) {
            if (selectedLayers.indexOf(i) !== -1) {
                // 将其他普通图层设置为引导层
                for (var k = 0; k < layers.length; k++) {
                    if (k !== i && layers[k].layerType === "normal") {
                        layers[k].layerType = "guide";
                    }
                }

                // 处理当前普通图层
                layers[i].layerType = "normal";
                var layerFilePath = saveDir + "/" + layers[i].name + (exportFormat ? ".swf" : "_frame.png");

                if (exportFormat) {
                    // 导出为 SWF 文件
                    doc.exportSWF(layerFilePath, true);
                    fl.trace("导出: " + layerFilePath);
                } else {
                    // 导出为 PNG 序列
                    var frameCount = timeline.frames.length;
                    var layerFolder = saveDir + "/" + layers[i].name + "_sequence/";
                    FLfile.createFolder(layerFolder);  // 创建文件夹
                    for (var j = 0; j < frameCount; j++) {
                        doc.gotoAndStop(j + 1);  // 跳到每一帧
                        var pngFilePath = layerFolder + layers[i].name + "_frame" + (j + 1) + ".png";
                        doc.exportToPNG(pngFilePath);  // 导出为 PNG 文件
                        fl.trace("导出: " + pngFilePath);  // 输出到控制台
                    }
                }

                layers[i].layerType = "guide";  // 导出后将当前图层设置为引导层
            }
        }
        alert("所有选定的普通图层已分别导出到: " + saveDir);
    }

    // 恢复所有图层的原始类型
    for (var i = 0; i < layers.length; i++) {
        layers[i].layerType = originalTypes[i];  // 恢复图层的原始类型
    }
}

// 调用主函数
exportSelectedLayers();