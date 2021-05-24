import { isString } from '@stl/tool-ts/src/common/obj/isString'
import { insertBefore } from '@stl/tool-ts/src/common/dom/insertBefore'
import { hasClass, addClass, removeClass } from '@stl/tool-ts/src/common/dom'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { on } from '@stl/tool-ts/src/common/event/on'
import { components_CommentModel } from './commentModel'
import { CommentTargetTypeEnum, PraiseBrowsePraiseTypeEnum, subCodeEnums } from '../../../../enums/enums'
import window from '../../common/win/windows'
import { currenttime } from '../../common/service/common.services'
import { get_time_timestamp, ge_time_format } from '../../../../common/utils/util'
import { AddPraise } from '../../common/service/PraiseBrowse.services'
import { ResCommentReplyModel } from '../../../../model/comment/resComment'
import { AddComment, AddCommentReply, GetCommentList, GetCommentReplyList } from '../../common/service/comment.services'
declare const $: JQueryStatic

/**
 * @param {CommentTargetTypeEnum} type 评论类型
 * @param {string} newsId 新闻id
 * @param {string} reputationId 口碑id  口碑新闻需要
 */
type commentParams = {
    type: CommentTargetTypeEnum,
    newsId: string,
    reputationId?: string
}

let givelikeCache = 'givelikeCache'

export async function comment1fn(parentId: string | HTMLElement, {
    type, newsId, reputationId
}: commentParams) {

    let parentdom: any = parentId

    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }

    //评论初始化
    await commentInit(parentdom, type === CommentTargetTypeEnum.news ? newsId : reputationId, type)


    let submit: HTMLElement = parentdom.querySelector('.submit')

    if (!parentdom) { return }

    let input = submit.querySelector('input')

    let subtn = submit.querySelector('a')

    let list_box = parentdom.querySelector('.list_box')

    subtn.onclick = async function () {
        if (input.value.length <= 0) {
            alert('回答不能为空！')
            return
        }

        let userid = (<any>this).dataset['id']

        let usercookie = window.getusercookie()
        if (!usercookie) {
            window.loginshow()
            alert('请先登录后发表评论')
            return
        }

        let datas = await setComment(parseInt(userid), input.value, type === CommentTargetTypeEnum.news ? newsId : reputationId, type)

        if (datas.code === 0 && datas.subCode === subCodeEnums.success) {
            let userJSON = JSON.parse(usercookie)
            let createtime = await currenttime()
            let commentModel = {
                args: [{
                    commentId: datas.bodyMessage,
                    commentUserName: userJSON.name,
                    commentUser: userJSON.userId,
                    commentUserIcon: userJSON.userIcon,
                    commentTime: createtime,
                    commentContent: input.value,
                    praiseCount: 0
                }]
            }

            let data: bodyModel<string> = await getcomponent({ path: 'components/comment/commonchild.njk', name: 'commonchild', data: commentModel })

            if (data.code === 0) {
                $(list_box).prepend(data.bodyMessage)
                window.imgload()
            }
            input.value = ''
            alert('提交成功！')
        } else {
            alert('发表失败，请重新发表！')
            return
        }
    }
    //展开收缩 提交回答按钮
    on({
        agent: list_box,
        events: 'click',
        ele: '.reply a',
        fn: function (dom: any, ev: any) {
            let parent = $(dom).parent()
            let sub = parent.siblings('.sub')
            let list_box = sub.parents('.list_box')
            if (sub[0].style.display === 'none') {
                //隐藏所有的提交框
                list_box.find('.sub').hide()
                sub.show()
            } else {
                sub.hide()
            }
        }
    })


    //展开收缩 更多回复
    on({
        agent: list_box,
        events: 'click',
        ele: '.reply span',
        fn: function (dom: any, ev: any) {
            let parent = $(dom).parent()
            let child_box = parent.siblings('.child_box')
            let i = dom.querySelector('i')
            if (child_box[0].style.display === 'none') {
                i.innerHTML = '&#xE013;'
                child_box.show()
            } else {
                i.innerHTML = '&#xE007;'
                child_box.hide()
            }
        }
    })

    //评论回复按钮
    on({
        agent: list_box,
        events: 'click',
        ele: '.sub a',
        fn: async function (dom: any, ev: any) {
            let btn = $(dom)
            let child_box = btn.parents('.child_box')
            let child_content = btn.parents('.child_content')
            let input = btn.siblings('.input').find('input')
            let sub = btn.parent()
            let value = input.val()
            let parentContentDom = sub.siblings('.content')

            if (value.length <= 0) {
                alert('回答不能为空！')
                return
            }

            let userid = (<any>dom).dataset['id'] || 0

            let parentId = (<any>dom).dataset['parentid'] || 0

            let commentId = (<any>dom).dataset['commentid'] || 0




            let usercookie = window.getusercookie()
            if (!usercookie) {
                window.loginshow()
                alert('请先登录后发表评论')
                return
            }
            let datas = await replycallback(commentId, userid, parentId, value)
            let createtime = await currenttime()

            let userJSON = JSON.parse(usercookie)
            if (datas.code === 0 && datas.subCode === subCodeEnums.success) {

                let commentModel: any = {
                    args: [{
                        replyId: datas.bodyMessage,
                        replyUser: userJSON.userId,
                        commentReplyContent: value,
                        replyTime: createtime,
                        commentId,
                        commentUser: userJSON.userId,
                        commentUserIcon: userJSON.userIcon,
                        commentUserName: userJSON.name,
                        praiseCount: 0,
                        commentContent: value,
                        at: userid === 0 ? null : {
                            commentContent: parentContentDom.find('span').html()

                        }
                    }]
                }

                let data: bodyModel<string> = await getcomponent({ path: 'components/comment/commonchild.njk', name: 'commonchild', data: commentModel })

                if (data.code === 0) {
                    let reply
                    //回复一级评论
                    if (userid === 0) {
                        sub.siblings('.child_box').find('.child_content').prepend(data.bodyMessage)
                        reply = sub.siblings('.reply')


                    } else {
                        child_content.prepend(data.bodyMessage)
                        reply = child_box.siblings('.reply')
                    }

                    if (reply.find('span').css('display') === 'none') { reply.find('span').show() }
                    let b = reply.find('span b')
                    let repliesCount = parseInt(b.text())
                    b.text((repliesCount + 1).toString())
                    input.val('')
                    alert('提交成功！')
                    sub.hide()
                    window.imgload()
                }
            }


        }
    })

    //点赞
    on({
        agent: list_box,
        events: 'click',
        ele: '.praiseCount',
        fn: async function (dom: any, ev: any) {

            let getuser = window.getuserid()
            if (getuser === 0) {
                alert('需要登录才能点赞')
                return
            }

            let cacheJson: string[] = getCacheJson(newsId)

            let id = dom.getAttribute('data-id')
            let replyId = dom.getAttribute('data-replyid')
            if (cacheJson.indexOf(id.toString()) >= 0) {
                alert('已经点过赞了！')
                return
            }
            //点赞模型
            let praiseObject = {
                targetId: parseInt(id),
                praiseType: replyId ? PraiseBrowsePraiseTypeEnum.commentReply : PraiseBrowsePraiseTypeEnum.comment,
                praiseUser: getuser,

            }
            let data = await AddPraise(praiseObject)

            if (data.code === 0 && data.subCode === subCodeEnums.success) {

                let val = parseInt(dom.querySelector('span').innerText)
                let i = dom.querySelector('i')
                let rank = 'rank'
                if (hasClass(dom, rank)) {
                    i.innerHTML = '&#xE018;'
                    removeClass(dom, rank)
                    dom.querySelector('span').innerText = Math.max(0, val - 1)
                } else {
                    i.innerHTML = '&#xE017;'
                    addClass(dom, rank)
                    dom.querySelector('span').innerText = val + 1
                }

                let cache = localStorage.getItem(givelikeCache)
                let cacheJson: any = {}
                if (cache) {
                    cacheJson = JSON.parse(cache)
                }

                if (!cacheJson[getuser]) { cacheJson[getuser] = {} }
                if (!cacheJson[getuser][newsId]) { cacheJson[getuser][newsId] = [] }
                cacheJson[getuser][newsId].push(id)

                localStorage.setItem(givelikeCache, JSON.stringify(cacheJson))
                window.imgload()
            } else {
                alert('点赞失败，请重试')
            }


        }
    })

    //点回复里面加载更多处理
    on({
        agent: list_box,
        events: 'click',
        ele: '.child_box .more',
        fn: async function (dom: any, ev: any) {
            let child_content = $(dom).siblings('.child_content')
            let time = child_content.children('.child').last().data('time')
            let commentId = child_content.children('.child').last().data('commentid')
            time = parseInt((time / 1000).toString())
            //评论
            let comment = await GetCommentReplyList({
                commentId,
                timeticks: time
            })


            if (comment.code === 0 && comment.subCode === subCodeEnums.success) {
                let commentdata = comment.bodyMessage
                if (commentdata.length < 10) {
                    dom.style.display = 'none'
                }
                DateFormatting(commentdata)
                let data: bodyModel<String> = await getcomponent({ path: 'components/comment/commonchild.njk', name: 'commonchild', data: { args: commentdata } })
                if (data.code === 0) {
                    child_content.append(data.bodyMessage)
                    givelikeinit(parentId, newsId)
                    window.imgload()
                }

            }
        }
    })


    //点外层加载更多
    on({
        agent: parentdom,
        events: 'click',
        ele: '.parentMore',
        fn: async function (dom: any, ev: any) {
            let list_box = $(dom).siblings('.list_box')
            let time = list_box.children('.child').last().data('time')
            time = parseInt((time / 1000).toString())
            //评论
            let comment = await GetCommentList({
                targetId: parseInt(type === CommentTargetTypeEnum.news ? newsId : reputationId),
                targetType: type,
                timeTicks: time
            })


            if (comment.code === 0 && comment.subCode === subCodeEnums.success) {
                let commentdata = comment.bodyMessage
                if (commentdata.length < 10) {
                    dom.style.display = 'none'
                }
                if (commentdata && commentdata.length > 0) {
                    commentdata.forEach(comment => {
                        if (comment.replys && comment.replys.length > 0) {
                            DateFormatting(comment.replys)
                        }
                    })
                }
                let data: bodyModel<String> = await getcomponent({ path: 'components/comment/commonchild.njk', name: 'commonchild', data: { args: commentdata } })
                if (data.code === 0) {
                    list_box.append(data.bodyMessage)
                    givelikeinit(parentId, newsId)
                    window.imgload()
                }

            }
        }
    })

    givelikeinit(parentId, newsId)
}

/**
 * 评论初始化
 * @param parentdom 
 * @param newsId 
 * @param type 
 */
async function commentInit(parentdom: HTMLElement, newsId: string, type: CommentTargetTypeEnum) {
    //评论
    let comment = await GetCommentList({
        targetId: parseInt(newsId),
        targetType: type,
        timeTicks: 0
    })

    let getuser = window.getusercookie()

    let getuserjson = {}
    if (getuser && getuser !== 'undefined') {
        getuserjson = JSON.parse(getuser)
    }

    let commentData: any = {
        commentUserName: getuserjson['name'],
        commentUser: getuserjson['userId'],
        commentUserIcon: getuserjson['userIcon'],
        commentId: 0,
        data: []
    }


    if (comment.code === 0 && comment.subCode === subCodeEnums.success) {
        let commentdata = comment.bodyMessage
        if (commentdata && commentdata.length > 0) {
            commentData.commentId = commentdata[0].commentId
            commentdata.forEach(comment => {
                if (comment.replys && comment.replys.length > 0) {
                    DateFormatting(comment.replys)
                }
            })
        }


        commentData.data = commentdata
        let data: bodyModel<string> = await getcomponent({ path: 'components/comment/comment1.njk', name: 'comment', data: { args: commentData } })
        if (data.code === 0) {
            parentdom.innerHTML = data.bodyMessage
            window.imgload()
        }

    }
}

//提交评论
async function setComment(id: number, value: string, commentTargetId: string, type: CommentTargetTypeEnum) {
    let data = await AddComment({
        commentUser: id,
        commentTargetId: parseInt(commentTargetId),
        commentTargetType: type,
        commentContent: value
    })
    return data
}

/**
 * 提交回复的评论
 */
async function replycallback(commentId: string, id: string, parentId: string, value: string) {
    let getuser = window.getusercookie()

    let getuserjson = {}
    if (getuser && getuser !== 'undefined') {
        getuserjson = JSON.parse(getuser)
    }
    let data = await AddCommentReply(
        {
            commentId: parseInt(commentId),
            commentUser: getuserjson['userId'],
            commentReplyId: parseInt(id),
            commentReplyUser: parentId ? parseInt(parentId) : 0,
            commentReplyContent: value
        }
    )
    return data
}

/**
 * 点赞状态初始化
 * @param {string} newsId 新闻id
 */
function givelikeinit(parentId: string | HTMLElement, newsId: string) {


    let cacheJson: string[] = getCacheJson(newsId)


    let parentdom: any = parentId

    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }
    let list_box: HTMLElement = parentdom.querySelector('.list_box')
    let praiseAry = list_box.querySelectorAll('.praiseCount')



    praiseAry.forEach(dom => {
        let id = dom.getAttribute('data-id')
        if (cacheJson.indexOf(id.toString()) >= 0) {
            addClass(dom, 'rank')
            dom.querySelector('i').innerHTML = '&#xE017;'
        }
    })


}

/** 获取点赞缓存
     *  {
            用户id:{
                新闻id:['id','id'],
                新闻id:['id','id']
            },
            用户id:{
                新闻id:['id','id'],
                新闻id:['id','id']
            },
        }
     */
function getCacheJson(newsId: string) {
    let getuser = window.getuserid()
    if (getuser === 0) { return [] }
    let cache = localStorage.getItem(givelikeCache)
    let cacheJson: string[] = []
    let json = {}
    if (cache) {
        json = JSON.parse(cache)
        let getuserJson = json[getuser] || {}
        cacheJson = getuserJson[newsId] || []
    }

    return cacheJson
}


/**
 * 数据整理
 * @param {ResCommentReplyModel[]} data 
 */
export function DateFormatting(data: ResCommentReplyModel[]) {
    data.forEach(reply => {
        reply.commentContent = reply.commentReplyContent
        //如果有回复的回复
        if (reply.replyParentId > 0) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
                if (item.replyId === reply.replyParentId) {
                    reply.at = item
                    //递归渲染模板需要赋值
                    reply.at.commentContent = item.commentReplyContent
                    break
                }
            }
        }
    })
}