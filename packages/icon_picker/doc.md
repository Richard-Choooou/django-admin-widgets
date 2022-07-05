# icon_pick
> 用于选择 ICON

<icon-picker name="icon" value="bi bi-123"></icon-picker>

## 使用示例

### 在 html 中使用
```html
<icon-picker name="icon" value="bi bi-123"></icon-picker>
```

### 在 python 中使用
```python
from dwc.widgets import IconPicker

class AdminMenuForm(forms.ModelForm):
    icon = forms.CharField(label="图标", strip=True, widget=IconPicker)

```

## options
|属性|类型|默认值|说明|
|  ----  |  ---- | ----  | ----  |
|  name  |string| null  | form 表单元素 name 属性 |
|  value  |string| null  | form 表单元素 value 属性  |