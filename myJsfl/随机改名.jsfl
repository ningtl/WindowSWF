// 函数：生成随机字符串
function generateRandomString(length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 函数：获取项目的原始名称（即短横线`-`之前的部分）
function getOriginalName(itemName) {
    var dashIndex = itemName.lastIndexOf('-');
    return dashIndex !== -1 ? itemName.substring(0, dashIndex) : itemName;
}

// 函数：获取项目的现有后缀名（如果有）
function getExistingSuffix(itemName) {
    var dashIndex = itemName.lastIndexOf('-');
    return dashIndex !== -1 && dashIndex < itemName.length - 1 ? itemName.substring(dashIndex + 1) : '';
}

// 函数：检查后缀名是否被修改过（即是否少于10个字符）
function isSuffixModified(suffix) {
    return suffix.length < 10;
}

// 函数：添加或替换后缀名
function addOrReplaceSuffix(itemName) {
    // 对于文件夹内的项目，只取项目名，不取文件夹名
    var lastIndex = itemName.lastIndexOf('/');
    var baseName = lastIndex !== -1 ? itemName.substring(lastIndex + 1) : itemName;
    
    // 获取原始名称和现有的后缀名（如果有）
    var originalName = getOriginalName(baseName);
    var existingSuffix = getExistingSuffix(baseName);
    
    // 生成新的后缀名
    var newSuffix = generateRandomString(10);
    
    // 如果现有后缀名被修改过（即少于10个字符），则保留它并添加新后缀名
    if (isSuffixModified(existingSuffix)) {
        return originalName + '-' + existingSuffix + '-' + newSuffix; // 保留现有后缀名并添加新后缀名
    } else {
        return originalName + '-' + newSuffix; // 替换或添加新后缀名
    }
}

// 主逻辑：遍历库中的所有项目并更新名称
var lib = fl.getDocumentDOM().library;
processItems(lib.items);

function processItems(items) {
    var itemCount = items.length;
    for (var i = 0; i < itemCount; i++) {
        var item = items[i];
        if (item.instanceType === 'folder') {
            // 如果是文件夹，则递归处理文件夹内的项目
            processItems(item.items);
        } else {
            // 如果是项目，则添加或替换后缀名
            var newName = addOrReplaceSuffix(item.name);
            item.name = newName;
           // fl.trace('Renamed "' + item.name + '"'); // 输出重命名信息，可选
        }
    }
}

//fl.trace('All items have been renamed with random suffixes.');// 输出重命名信息，可选
