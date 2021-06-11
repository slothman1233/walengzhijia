import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic
import { on } from '@stl/tool-ts/src/common/event'
import { Login, Register, sendCode } from '../../../common/service/login.services'
import window from '../../../common/win/windows'
import { LoginEnums, subCodeEnums, UserUpdateTypeDefine, ValidateCodeDefine } from '../../../../../enums/enums'
import { LepackUserItemModel } from '../../../../../model/user/User'
import { UpdateUserByItem } from '../../../common/service/ManageLepackUser'
import { userLoginModel } from '../../../../../model/common'
import { uploadfilefn } from '../../../components/uploadfile'
import { GetAreaInfosByCode, GetParentInfoByCode } from '../../../common/service/AreaInfo.services'
import { ResAreaInfoModel } from '../../../../../model/arerinfo/resAreInfo'
declare const mui: any

let usercookie: userLoginModel = JSON.parse(window.getusercookie())
let systeminfo = document.querySelector('.systeminfo');

//修改用户名
(function () {
    on({
        agent: '#username',
        events: 'tap',
        ele: '.left',
        fn: function (dom: HTMLElement) {
            mui('#username').popover('toggle')
        }
    })

    on({
        agent: '#username',
        events: 'tap',
        ele: '.content a',
        fn: async function (dom: HTMLElement) {
            let contentdom = document.getElementById('username').querySelector('.content')
            let value = contentdom.querySelector('textarea').value

            if (value.length < 2 || value.length > 20) {
                alert('昵称大小必须在2-20个字符以内')
                return
            }

            let isSuccess = await UpdateUserItem({
                userId: parseInt(usercookie.userId),
                itemValue: value,
                itemType: UserUpdateTypeDefine.Update_UserName
            })

            if (!isSuccess) {
                alert('保存失败，请重新保存')
                return
            }

            usercookie.name = value
            window.setusercookie(JSON.stringify(usercookie))
            systeminfo.querySelector('.username p').innerHTML = value
            alert('保存成功')
            mui('#username').popover('toggle')
        }
    })

})();

//修改头像
(function () {
    //上传图片
    let input = systeminfo.querySelector('input')
    uploadfilefn(input, {
        success: async (url: string) => {
            let isSuccess = await UpdateUserItem({
                userId: parseInt(usercookie.userId),
                itemValue: url,
                itemType: UserUpdateTypeDefine.Update_Icon
            })

            if (!isSuccess) {
                alert('上传失败请重新上传')
                return
            }
            (<HTMLImageElement>systeminfo.querySelector('.headerfile img')).src = url
            // $(input).parent().siblings('.padding').find('img').attr('src', url)
            alert('上传成功')

            usercookie.userIcon = url
            window.setusercookie(JSON.stringify(usercookie))
        },
        error: (err: any) => {
            alert('上传失败请重新上传')
        },
        progress: (i: number) => {
            // console.log(i)
        }
    })
})();


//修改所在行业
(function () {
    on({
        agent: '#industry',
        events: 'tap',
        ele: '.left',
        fn: function (dom: HTMLElement) {
            mui('#industry').popover('toggle')
        }
    })

    on({
        agent: '#industry',
        events: 'tap',
        ele: '.content a',
        fn: async function (dom: HTMLElement) {
            let contentdom = document.getElementById('industry').querySelector('.content')
            let value = contentdom.querySelector('textarea').value

            if (value.length <= 0) {
                alert('行业不能为空！')
                return
            }

            let isSuccess = await UpdateUserItem({
                userId: parseInt(usercookie.userId),
                itemValue: value,
                itemType: UserUpdateTypeDefine.Update_Industry
            })

            if (!isSuccess) {
                alert('保存失败，请重新保存')
                return
            }

            usercookie.industry = value
            window.setusercookie(JSON.stringify(usercookie))
            systeminfo.querySelector('.industry p').innerHTML = value
            alert('保存成功')
            mui('#industry').popover('toggle')
        }
    })

})();

//性别
(function () {
    let picker = new mui.PopPicker()

    picker.panel.querySelector('.mui-poppicker-header span').innerHTML = '性别'
    picker.setData([{
        value: '1',
        text: '男'
    }, {
        value: '2',
        text: '女'
    }])
    picker.pickers[0].setSelectedIndex(usercookie.sex, 1000)
    on({
        agent: systeminfo,
        events: 'tap',
        ele: '.sex',
        fn: async function (dom: HTMLElement) {

            picker.show(async function (SelectedItem: any) {
                console.log(SelectedItem)
                let type = SelectedItem[0].value

                let isSuccess = await UpdateUserItem({
                    userId: parseInt(usercookie.userId),
                    itemValue: type,
                    itemType: UserUpdateTypeDefine.Update_Sex
                })

                if (!isSuccess) {
                    alert('保存失败，请重新保存')
                    return
                }
                usercookie.sex = parseInt(type)
                window.setusercookie(JSON.stringify(usercookie))
                systeminfo.querySelector('.sex p').innerHTML = SelectedItem[0].text
                alert('保存成功')

            })

        }
    })
})();


//所在地区
(async function () {
    let cacheAllcity = {}

    let districtAllJSON: any = {}
    let cityJSON: any = {}
    if (usercookie.areaCode === 0) {
    //获取中国的地区
        let { object } = await getAreaByCodeInfo(6541)

        //拿到第一个地区的code
        let districtCode = object.data[0].value
        //拿到第一个地区对应的城市
        let { object: cityobject } = await getAreaByCodeInfo(districtCode)
        //cityJSON
        object.data[0].children = cityobject.data

        districtAllJSON = object

        cacheAllcity[districtCode] = cityobject.data
    } else {
        let { object: cityobject, parentCode } = await getAreaParentByCodeInfo(usercookie.areaCode)
        cityJSON = cityobject

        let { object } = await getAreaParentByCodeInfo(parentCode)

        object.data[object.selectIndex].children = cityJSON.data

        districtAllJSON = object

        cacheAllcity[parentCode] = cityJSON.data
    }


    let picker = new mui.PopPicker({
        layer: 2
    })
    picker.panel.querySelector('.mui-poppicker-header span').innerHTML = '所在地区'
    picker.setData(districtAllJSON.data)

    picker.pickers[0].setSelectedIndex(districtAllJSON.selectIndex)
    picker.pickers[1].setSelectedIndex(cityJSON.selectIndex)
    picker.selectionChanged = async function (thatdom: any) {
        let next = thatdom.nextSibling
        let that = this
        if (next && next.picker) {
            let { value, text } = that.getSelectedItems()[0]

            if (cacheAllcity[value]) {
                next.picker.setItems(cacheAllcity[value])
            } else {
                let { object } = await getAreaByCodeInfo(value)
                next.picker.setItems(object.data)
                cacheAllcity[value] = object.data

            }
        }
    }
    on({
        agent: systeminfo,
        events: 'tap',
        ele: '.area',
        fn: async function (dom: HTMLElement) {

            picker.show(async function (SelectedItem: any) {
                let type = SelectedItem[0].value

                let isSuccess = await UpdateUserItem({
                    userId: parseInt(usercookie.userId),
                    itemValue: SelectedItem[1].value,
                    itemType: UserUpdateTypeDefine.Update_AreaCode
                })

                if (!isSuccess) {
                    alert('保存失败，请重新保存')
                    return
                }
                usercookie.areaCode = parseInt(SelectedItem[1].value)
                window.setusercookie(JSON.stringify(usercookie))
                systeminfo.querySelector('.area p').innerHTML = `${SelectedItem[0].text} ${SelectedItem[1].text}`
                alert('保存成功')

            })

        }
    })
})()

/**
 * 修改单条数据
 * @param option 
 */
async function UpdateUserItem(option: LepackUserItemModel) {
    let data = await UpdateUserByItem(option)
    if (data.code === 0 && data.subCode === subCodeEnums.success) {
        return true
    }
    return false
}


//通过地区向下拿到对应的地区
async function getAreaByCodeInfo(code: number) {
    let data = await GetAreaInfosByCode({ areaCode: code })
    let object: any = {}
    if (data.code === 0 && data.subCode === subCodeEnums.success) {
        object = getSelectOptionObject(data.bodyMessage)
    }

    return object
}

//通过地区向上拿到对应的地区
async function getAreaParentByCodeInfo(code: number) {
    let data = await GetParentInfoByCode({ areaCode: code })
    let object: any = {}
    if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
        object = getSelectOptionObject(data.bodyMessage, code)
    }
    return object
}

//对象 selectoption 序列化
async function getSelectOptionObject(data: ResAreaInfoModel[], areaCode: number = 0) {

    let object: any = {
        selectIndex: 0,
        data: []
    }
    let parentCode = 0
    data.forEach((item, index) => {
        if (areaCode !== 0) {
            if (areaCode === item.areaCode) {
                object.selectIndex = index
                parentCode = item.parentCode
            }
        }
        object.data.push({
            value: item.areaCode,
            text: item.areaDesc
        })
    })

    return { object, parentCode }
}