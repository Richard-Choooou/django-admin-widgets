# icon_pick
> 用于选择 ICON

<icon-picker name="icon" value="bi bi-123"></icon-picker>

## 使用示例

```html
<!-- html -->
<icon-picker name="icon" value="bi bi-123"></icon-picker>
```

```python
# python
from dwc.widgets import IconPicker

class AdminMenuForm(forms.ModelForm):
    icon = forms.CharField(label="图标", strip=True, widget=IconPicker)

```

## options
|属性|默认值|说明|
|  ----  | ----  | ----  |
|  name  | null  | form 表单元素 name 属性 |
|  value  | null  | form 表单元素 value 属性  |