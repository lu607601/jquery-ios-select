import jquery from 'jquery'
import BScroll from 'better-scroll'
import './main.less'

;(function($) {
    $.fn.selectScroll = function(options) {
        var defaultSettings = {
            // texts
            title: '请选择',
            // 1级数据
            // data: [],

            // 多级数据

            data: [
                [{
                  text: '水晶室女水晶室女水晶室女水晶室女水晶室女',
                  id: 12
                },
                {
                  text: '莉娜',
                  id: 13
                },
                {
                  text: '斯拉克',
                  id: 14
                },
                {
                  text: '斯拉达',
                  id: 15
                }],
                [{
                  text: '水晶室女22水晶室女22水晶室女22水晶室女22水晶室女22水晶室女22水晶室女22',
                  id: 12
                },
                {
                  text: '莉娜22',
                  id: 13
                },
                {
                  text: '斯拉克22',
                  id: 14
                },
                {
                  text: '斯拉达33',
                  id: 15
                }],
                [{
                  text: '水晶室女33',
                  id: 12
                },
                {
                  text: '莉娜33',
                  id: 13
                },
                {
                  text: '斯拉克33',
                  id: 14
                },
                {
                  text: '斯拉达33斯拉达33斯拉达33斯拉达33斯拉达33斯拉达33',
                  id: 15
                }]
            ],
            // buttons
            cancelTxt: 'cancel',
            cancelClass: '',
            confirmTxt: 'confirm',
            confirmClass: '',
            cancel: null,
            confirm: null,

            // controls
            selectedIndex: [0, 0, 0],

            // class
            class: ''
        }

        this.settings = $.extend({}, defaultSettings, options)

        // option value of maxLevel： 1、2
        // this.settings.maxLevel = this.settings.maxLevel < 0 ? 1 : this.settings.maxLevel > 2 ? 2 : this.settings.maxLevel
        this.settings.maxLevel = this.settings.data.length > 3 ? 3 : this.settings.data.length > 0 ? this.settings.data.length : 1
        function getWheelHtml (len) {
            let tempWheelHtml = ''
            for (let i = 0; i < len; i++) {
                tempWheelHtml += `<div class="wheel">
                                    <ul class="wheel-scroll">
                                    </ul>
                                </div>
                                `
            }
            return tempWheelHtml
        }

        var wheelHtml = getWheelHtml.call(this, this.settings.maxLevel)

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
                    <div class="wheel-wrapper">`
                    + wheelHtml +
                    `</div>
                </div>
                <div class="picker-footer"></div>
            </div>
        </div>`

        var $self = this

        $self.$wheel = [] // 存放select-scroll对象的数组

        $self.isEmpty = function () {
            return !$self.settings.data.length
        }

        $self.init = function() {
            $self.show()
        }
        // confirm
        $self.confirm = function(e) {
            // console.log('点击了confirm')

            let selectObj = $self.getData()

            $self.hide()
            $self.bindSelectedIndex()

            if (e.data.callback) {
                e.data.callback(selectObj)
            } else {
                let text = ''
                Object.keys(selectObj).reduce(function (prev, cur) {
                    text += selectObj[prev].text + ',' + selectObj[cur].text
                    return cur
                })
                $self.html(text)
            }
        }

        // cancel
        $self.cancel = function() {
            console.log('点击了cancel')
            $self.hide()
        }

        // show selectScroll
        $self.show = function() {
            console.log('这里是show函数')
            for (let i = 0; i < $self.settings.maxLevel; i++) {
                $self._createWheel(i)
            }
        }

        // hide
        $self.hide = function() {
            console.log('这里是hide')
            if ($self.$picker) {
                $self.$picker.hide()
            }
        }

        // destroy
        $self._destroy = function() {
            console.log('这里是_destroy')
            if ($self.$wheel[index]) {
                $self.$wheel[index].disable()
                $self.$wheel[index].destroy()
                console.log('这里是_destroy里的$self.$wheel[index]')
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
            let tempArr = []
            if (!$self.isEmpty()) {
                for (let i = 0; i < $self.$wheel.length; i++) {
                    tempArr.push($self.settings.data[i][$self.$wheel[i].getSelectedIndex()])
                }
                return tempArr
            } else {
                return []
            }
        }

        // index of data
        $self.setSelectedIndex = function(index) {
            $self.bindSelectedIndex(index)
        }

        // update selectedIndex
        $self.updateSelectedIndex = function () {
            console.log('这是updateSelectedIndex:')

            // autofill $self.settings.selectedIndex
            let i = $self.settings.selectedIndex.length
            for (i; i < $self.settings.maxLevel; i++) {
                $self.settings.selectedIndex[i] = 0
            }

            // if  $self  has attr data-selectIndex
            if ($self.attr('data-selectindex')) {
                $self.settings.selectedIndex = $self.attr('data-selectindex').split(',')
            }
        }

        // set attr data-selectIndex for $self
        $self.bindSelectedIndex = function () {
            let selectedIndex = []
            for (let i = 0; i < $self.$wheel.length; i++) {
                selectedIndex.push($self.$wheel[i].getSelectedIndex())
            }
            // selectedIndex must have value
            if (selectedIndex.lenght) {
                $self.attr('data-selectIndex', selectedIndex)
            }
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
            $self.$wheel[index].wheelTo(index)
        }

        $self._createWheel = function(index) {
            $self._createHtml(index)

            // get only dom $picker
            $self.$picker = $self.next('.picker')

            // updateSelectedIndex
            $self.updateSelectedIndex()

            let wheels = document.querySelectorAll('.wheel')

            // creat wheel
            $self.$wheel[index] = new BScroll(wheels[index], {
                wheel: {
                    selectedIndex: $self.settings.selectedIndex[index],
                    wheelWrapperClass: 'wheel-scroll',
                    wheelItemClass: 'wheel-item'
                },
                probeType: 3
            })

            $self.attachButtonEvents()
        }

        $self._createHtml = function(index) {

            var liHtml = ''
            let dataLen = this.settings.data.length ? this.settings.data[index].length : 0
            for(var i = 0; i < dataLen; i ++) {
                liHtml += `<li class="wheel-item" data-id="` + this.settings.data[index][i].id + `">` + this.settings.data[index][i].text + `</li>`
            }
            // only first time can add defaultHtml
            if (!index) {
                $self.after(defaultHtml)
            }

            $('.wheel-scroll').eq(index).append(liHtml).closest('.pick').show()
        }

        $self.init()

    }
})(jquery);

// 使用
function init () {
    jquery('#test').selectScroll({
        selectedIndex: [0],
        cancel: function () {
            console.log('点击了取消回调')
        },
        confirm: function () {
            console.log('点击了确认回调')
        }
    })
}

var $doc = jquery(document)
$doc.on('click', '#test', init)
