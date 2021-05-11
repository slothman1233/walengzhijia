

/**
 * 组件中评论的渲染模型
 * @param {string} parentId 父级id   回复的回复使用
 * @param {string} username 用户名称
 * @param {string} userid 用户ID
 * @param {string} userhread 用户头像
 * @param {string} createtime 评论创建时间
 * @param {string} content 评论内容
 * @param {string} praise 点赞数
 */
export interface components_CommentModel {
  parentId?: string,
  username: string,
  userid: string,
  userhread: string,
  createtime: string,
  content: string,
  praise: string
}

/**
 * 组件中评论回复的渲染模型
 * @param {string} username 用户名称
 * @param {string} userid 用户ID
 * @param {string} userhread 用户头像
 * @param {string} createtime 评论创建时间
 * @param {string} content 评论内容
 * @param {string} praise 点赞数
 * @param {components_CommentModel | null} at 是否是回复的回复 
 */
export interface components_CommentReplyModel extends components_CommentModel {

  at: components_CommentModel | null
}

// {
//   parentId: parentId === 0 ? userid : parentId,
//     username: 'fff',
//     userid: '123213',
//     userhread: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
//     createtime: '2021-11-11',
//     content: value,
//     praise: '2000',
//     at: parentId === 0 ? null : {
//       username: 'fff',
//       userid: userid,
//       content: '1.5L和1.3T的哪个更值得买?1.5L和1.3T的哪个更值得买?1.5L和1.3T的哪个更值得买?'
//     }
// }


