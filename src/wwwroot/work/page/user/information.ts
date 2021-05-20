import { usernavigationbar } from '../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event/on'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { uploadfilefn } from '../../components/uploadfile'
import window from '../../common/win/windows'
import { userLoginModel } from '../../../../model/common'
import { GetAreaInfosByCode, GetParentInfoByCode } from '../../common/service/AreaInfo.services'
import { ResAreaInfoModel } from '../../../../model/arerinfo/resAreInfo'
import { subCodeEnums, UserUpdateTypeDefine } from '../../../../enums/enums'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { bodyModel } from '../../../../model/resModel'
import { selectOption1 } from '../../components/select'
import { LepackUserItemModel } from '../../../../model/user/User'
import { UpdateUserByItem } from '../../common/service/ManageLepackUser'
declare const $: JQueryStatic
declare const type: any
declare const userid: any

let usercookie: userLoginModel = JSON.parse(window.getusercookie());

//获取地区和城市
(async function () {
    let cityCode = 0
    let selectOption_box = document.querySelector('.selectOption_box')
    let selectOption_area: HTMLElement = selectOption_box.querySelector('.selectOption_area')
    let selectOption_city: HTMLElement = selectOption_box.querySelector('.selectOption_city')
    //拿城市和地区的内容
    if (usercookie.areaCode === 0) {
        //获取中国的地区
        let districtAllJSON = await getAreaByCodeInfo(6541)

        //拿到第一个地区的code
        let districtCode = districtAllJSON.data[0].id
        //拿到第一个地区对应的城市
        let cityJSON = await getAreaByCodeInfo(districtCode)

        selectOption_area.innerHTML = districtAllJSON.html

        selectOption_city.innerHTML = cityJSON.html

        cityCode = cityJSON.data[0].id

    } else {
        cityCode = usercookie.areaCode

        let cityJSON = await getAreaParentByCodeInfo(usercookie.areaCode)

        let districtAllJSON = await getAreaParentByCodeInfo(cityJSON.parentCode)

        selectOption_area.innerHTML = districtAllJSON.html

        selectOption_city.innerHTML = cityJSON.html
    }

    //地区
    selectOption1(selectOption_area, async (id: number, e: Event, option: HTMLElement) => {

        let cityJSON = await getAreaByCodeInfo(id)
        selectOption_city.innerHTML = cityJSON.html
        cityCode = cityJSON.data[0].id
    })

    //城市
    selectOption1(selectOption_city, (id: number, e: Event, option: HTMLElement) => {
        cityCode = id
    })


    //---------------------------------------------------------------------------------------------
})()

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
    if (data.code === 0 && data.subCode === subCodeEnums.success) {
        object = getSelectOptionObject(data.bodyMessage, code)
    }
    return object
}

//对象 selectoption 序列化
async function getSelectOptionObject(data: ResAreaInfoModel[], areaCode: number = 0) {

    let object: any = {
        args: {
            selectIndex: 0,
            data: []
        }
    }
    let parentCode = 0
    data.forEach((item, index) => {
        if (areaCode !== 0) {
            if (areaCode === item.areaCode) {
                object.args.selectIndex = index
                parentCode = item.parentCode
            }
        }
        object.args.data.push({
            id: item.areaCode,
            value: item.areaDesc
        })
    })

    return { html: await getSelectOptionHtml(object), data: object.args.data, parentCode }
}

async function getSelectOptionHtml(object: any) {
    let data: bodyModel<String> = await getcomponent({ path: 'components/selectOption.njk', name: 'selectOption', data: object })

    if (data.code === 0) {
        return data.bodyMessage
    }
    return ''
}

//修改
(function () {
    //修改
    on({
        agent: document.querySelector('.information_content'),
        events: 'click',
        ele: '.applyfor',
        fn: function (dom: any, ev: any) {

            let classname = dom.className
            if (classname.indexOf('username') >= 0) {
                //用户名
                $(dom).siblings('.textarea').attr('contenteditable', 'plaintext-only')
            } else if (classname.indexOf('sex') >= 0) {
                //性别
                $(dom).siblings('.textarea').hide()
                $(dom).siblings('.inputradio').show()
            } else if (classname.indexOf('industry') >= 0) {
                //所在行业
                $(dom).siblings('.textarea').attr('contenteditable', 'plaintext-only')

            } else if (classname.indexOf('area') >= 0) {
                //所在地区
                $(dom).siblings('.textarea').hide()
                $(dom).siblings('.selectOption_box').show()

            }


            $(dom).hide()
            $(dom).siblings('.submit').show()
        }
    })

    //保存
    on({
        agent: document.querySelector('.information_content'),
        events: 'click',
        ele: '.submit',
        fn: async function (dom: HTMLElement, ev: any) {
            let classname = dom.className
            if (classname.indexOf('username') >= 0) {
                //用户名
                let username = $(dom).siblings('.textarea').text()
                if (username.length <= 0) {
                    alert('用户名不能为空！')
                    return
                }
                let isSuccess = await UpdateUserItem({
                    userId: parseInt(usercookie.userId),
                    itemValue: username,
                    itemType: UserUpdateTypeDefine.Update_UserName
                })

                if (!isSuccess) {
                    alert('保存失败，请重新保存')
                    return
                }

                usercookie.name = username
                window.setusercookie(JSON.stringify(usercookie))

                $(dom).siblings('.textarea').attr('contenteditable', 'false')


            } else if (classname.indexOf('sex') >= 0) {
                //性别
                let inputradio = $(dom).siblings('.inputradio')
                let select_checked: HTMLInputElement = inputradio[0].querySelector('.radio input:checked')
                let type = select_checked.getAttribute('data-id')


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

                $(dom).siblings('.textarea').text(select_checked.value)
                $(dom).siblings('.textarea').show()
                inputradio.hide()
            } else if (classname.indexOf('industry') >= 0) {
                //所在行业
                let value = $(dom).siblings('.textarea').text()
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
                $(dom).siblings('.textarea').attr('contenteditable', 'false')

            } else if (classname.indexOf('area') >= 0) {
                //所在地区
                let selectOptin_box = $(dom).siblings('.selectOption_box')
                let area = selectOptin_box.find('.selectOption_area .selectOption h1 span').text()
                let city = selectOptin_box.find('.selectOption_city .selectOption h1 span').text()
                $(dom).siblings('.textarea').text(`${area} ${city}`)
                let id = selectOptin_box.find('.selectOption_city .selectOption h1').attr('data-id')
                // let value = $(dom).siblings('.textarea').text()

                let isSuccess = await UpdateUserItem({
                    userId: parseInt(usercookie.userId),
                    itemValue: id,
                    itemType: UserUpdateTypeDefine.Update_AreaCode
                })

                if (!isSuccess) {
                    alert('保存失败，请重新保存')
                    return
                }

                usercookie.areaCode = parseInt(id)
                usercookie.areaCodeValue = `${area} ${city}`
                window.setusercookie(JSON.stringify(usercookie))
                selectOptin_box.hide()
                $(dom).siblings('.textarea').show()
            }

            $(dom).hide()
            $(dom).siblings('.applyfor').show()
        }
    })


    //上传图片
    document.querySelector('.information_content').querySelectorAll('.uploadfileinput').forEach(function (input: HTMLInputElement, index: number) {
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
                $(input).parent().siblings('.padding').find('img').attr('src', url)
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

//保存
(function () {

    //新建下的保存
    let information_submit = $('#usermain .information_submit')
    information_submit.click(function () {
        alert('保存成功')
    })


})()
