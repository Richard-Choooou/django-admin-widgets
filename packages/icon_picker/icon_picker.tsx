import { Component, Prop, h, State, Listen } from '@stencil/core'

@Component({
    tag: 'icon-picker',
    styleUrl: "./icon_picker.scss",
    // scoped: true
    // shadow: true,
})
export class MyComponent {
    @State() isShow = false
    @State() icons: string[] = []
    @State() chooseIcon = ""
    @State() searchResult = []
    @State() searchText = ""
    @Prop() name = ""
    @Prop() value = ""

    @Listen('click', { target: 'document' })
    listenClick(e) {
        let isClickSelf = false

        let target = e.target
        while (target) {
            if (target === this) {
                isClickSelf = true
                break
            }
            target = target.parentNode
        }

        if (!isClickSelf) {
            this.isShow = false
        }
    }

    onclick() {
        this.isShow = !this.isShow
    }

    componentWillLoad() {
        console.log("load")
        this.getBootstrapIcon()
        this.chooseIcon = this.value
    }

    async getBootstrapIcon() {
        const response = await fetch("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css?t=" + +new Date())
        const text = await response.text()
        let iconGroups = text.match(/\.bi(.+)::before/ig)
        iconGroups = iconGroups.map(val => val.match(/\.(.*)::before/)[1])
        this.icons = iconGroups
    }

    search(text) {
        this.searchText = text
        if (text) {
            this.searchResult = this.icons.filter(val => val.includes(text))
        } else {
            this.searchResult = []
        }
        
    }

    render() {
        const renderList = this.searchResult.length > 0 ? this.searchResult : this.icons
        return <div class="icon-picker" onClick={() => this.onclick()}>
            <input name={this.name} value={this.chooseIcon} type="text" hidden />
            <i class={`${this.chooseIcon || 'bi-plus-square'} choose`}></i>
            <div class={`top-bar`} onClick={e => e.stopPropagation()} hidden={!this.isShow}>
                <i class={"bi bi-search"}></i>
                <input value={this.searchText} type="text" placeholder='输入内容进行搜索' class={`search`} onInput={(e: any) => this.search(e.target.value)} />
                <button onClick={() => this.search("")}>清除</button>
            </div>
            {
                <div class="icons" hidden={!this.isShow} onClick={e => e.stopPropagation()}>
                    
                    {
                        renderList.map(val => <div class="icon" title={val} onClick={() => {
                            this.chooseIcon = `bi ${val}`
                            this.value = this.chooseIcon
                        }}>
                            <i class={`bi ${val}`}></i>
                            <span class={'name'}>{val}</span>
                        </div>)
                    }
                </div>
            }
            <span class="title">{this.chooseIcon ? this.chooseIcon : "请选择"}</span>
        </div>;
    }
}