import jquery from 'jquery'
import BScroll from 'better-scroll'
import './main.less'

;(function($) {
    $.fn.selectScroll = function(options) {
        var defaultSettings = {
            // texts
            title: '请选择',
            data: [{
                text: '剧毒',
                id: 1
            }, {
                text: '蚂蚁',
                id: 2
            }, {
                text: '测试',
                id: 3
            }],

            // buttons
            cancelTxt: 'cancel',
            cancelClass: '',
            confirmTxt: 'confirm',
            confirmClass: '',
            cancel: null,
            confirm: null,

            // controls
            selectedIndex: 0,

            // class
            class: ''
        }

        this.settings = $.extend({}, defaultSettings, options)
        var defaultHtml = `<div class="picker">
            <div class="picker-panel">
                <div class="picker-choose border-bottom-1px">
                    <span class="cancel">` + this.settings.cancelTxt + `</span>
                    <span class="confirm">` + this.settings.confirmTxt + `</span>
                    <h1 class="picker-title">` + this.settings.title + `</h1>
                </div>
                <div class="picker-content">
                    <div class="mask-top border-bottom-1px"></div>
                    <div class="mask-bottom border-top-1px"></div>
                    <div class="wheel-wrapper">
                        <div class="wheel">
                            <ul class="wheel-scroll">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="picker-footer"></div>
            </div>
        </div>`

        var $self = this

        $self.$wheel = null // 创建select-scroll对象

        $self.init = function() {
            $self.show()
        }

        // confirm
        $self.confirm = function(e) {
            console.log('点击了confirm', e)
            // $self._destroy()

            let selectObj = $self.getData()

            $self.hide()
            $self.bindSelectedIndex()

            if (e.data.callback) {
                e.data.callback(selectObj)
            }
            console.log('确定里的getData:', $self.getData())
        }

        // cancel
        $self.cancel = function() {
            console.log('点击了cancel')
            $self._destroy()
        }

        // show selectScroll
        $self.show = function() {
            console.log('这里是show函数')
            $self._createWheel()
        }

        // hide
        $self.hide = function() {
            console.log('这里是hide')
            if ($self.$wheel) {
                $self.$wheel.disable()
            }
            if ($self.$picker) {
                $self.$picker.hide()
            }
        }

        // destroy
        $self._destroy = function() {
            console.log('这里是_destroy')
            if ($self.$wheel) {
                $self.$wheel.disable()
                $self.$wheel.destroy()
                console.log('这里是_destroy里的$self.$wheel')
            }
            if ($self.$picker) {
                $self.$picker.remove()
                console.log('这里是_destroy里的$self.picker')
            }
        }

        // setData
        $self.setData = function() {
        }

        $self.getData = function() {
            return $self.settings.data[$self.$wheel.getSelectedIndex()]
        }

        // index of data
        $self.setSelectedIndex = function(index) {
            $self.bindSelectedIndex(index)
        }

        // update selectedIndex
        $self.updateSelectedIndex = function () {
            console.log('这是updateSelectedIndex:')
            // if  $self  has attr data-selectIndex
            if ($self.attr('data-selectindex')) {
                $self.settings.selectedIndex = $self.attr('data-selectindex')
            }
        }

        // set attr data-selectIndex for $self
        $self.bindSelectedIndex = function (index) {
            $self.attr('data-selectIndex', $self.$wheel.getSelectedIndex() || index)
        }

        // unbind buttons events
        $self.detachButtonEvents = function () {
            console.log('这里是detachButtonEvents')
            $self.$confirm.unbind()
            $self.$cancel.unbind()
        }

        // attach buttons events
        $self.attachButtonEvents = function() {
            console.log('这里是attachButtonEvents')
            $self.$confirm = $self.$picker
                .find('.confirm')
                .addClass($self.settings.confirmClass)

            $self.$confirm.bind('click', {callback: $self.settings.confirm}, $self.confirm)

            $self.$cancel = $self.$picker
                .find('.cancel')
                .addClass($self.settings.cancelClass)

            $self.$cancel.bind('click', {callback: $self.settings.cancel}, $self.cancel)
        }

        $self.scrollTo = function(index) {
            console.log('这是scrollTo')
            $self.$wheel.wheelTo(index)
            console.log('$self.$wheel:\n', $self.$wheel)
        }

        $self._createWheel = function() {
            $self._createHtml()

            // get only dom $picker
            $self.$picker = $self.next('.picker')

            // updateSelectedIndex
            $self.updateSelectedIndex()
            // creat wheel
            $self.$wheel = new BScroll('.wheel', {
                wheel: {
                    selectedIndex: $self.settings.selectedIndex,
                    wheelWrapperClass: 'wheel-scroll',
                    wheelItemClass: 'wheel-item'
                },
                probeType: 3
            })

            $self.attachButtonEvents()
        }

        $self._createHtml = function() {

            var liHtml = ''
            for(var i = 0; i < this.settings.data.length; i ++) {
                liHtml += `<li class="wheel-item" data-id="` + this.settings.data[i].id + `">` + this.settings.data[i].text + `</li>`
            }

            $self.after(defaultHtml)

            $('.wheel-scroll').append(liHtml).closest('.pick').show()

        }

        $self.init()
    }
})(jquery);

// 使用
function init () {
    jquery('#test').selectScroll({
        title: '测试title',
        selectedIndex: 2,
        cancelTxt: '取消',
        cancelClass: 'cancelClass',
        confirmTxt: '确定',
        confirmClass: 'confirmClass',
        cancel: function () {
            console.log('点击了取消回调')
        },
        confirm: function (data) {
            console.log('点击了确定回调')
            console.log('回调函数里的data:', data)
            jquery('#test').html(data.text)
        }
    })
}

var $doc = jquery(document)
$doc.on('click', '#test', init)
