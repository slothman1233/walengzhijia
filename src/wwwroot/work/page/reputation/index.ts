import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { navigationbar2 } from '../../components/navigationbar'
import { selectOption1 } from '../../components/select'



(function () {

    selectOption1('option1', (id, e, option) => {
        document.location.href = `/reputation/${id}`
        option.style.display = 'none'
    })
})();

(function () {
    let datas =
    [
        {
            id: 11,
            hread: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            name: '李女士111',
            price: '300万',
            buytime: '2019-06',
            actiontime: '2020-12',
            description: '外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做...',
            atlas: [
                'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0'
            ],
            kbgrade: '5.00',
            xingneng: '5',
            waiguan: '5',
            shouhou: '5',
            zidonghua: '5',
            peizhi: '5',
            zhiliang: '5',
            nenghao: '5'
        }, {
            id: 11,
            hread: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            name: '李女士',
            price: '300万',
            buytime: '2019-06',
            actiontime: '2020-12',
            description: '外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做...',
            atlas: [
                'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0'
            ],
            kbgrade: '5.00',
            xingneng: '5',
            waiguan: '5',
            shouhou: '5',
            zidonghua: '5',
            peizhi: '5',
            zhiliang: '5',
            nenghao: '5'
        }, {
            id: 11,
            hread: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            name: '李女士',
            price: '300万',
            buytime: '2019-06',
            actiontime: '2020-12',
            description: '外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做工精致，用料考究。外观大气，空间宽大，较老款乘座舒适性有很大提高，驾驭起来底盘扎实，提速较快，新平台，新技术。做...',
            atlas: [
                'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0', 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0'
            ],
            kbgrade: '5.00',
            xingneng: '5',
            waiguan: '5',
            shouhou: '5',
            zidonghua: '5',
            peizhi: '5',
            zhiliang: '5',
            nenghao: '5'
        }
    ]


    navigationbar2('reputationlist', async (dom) => {

        let row2 = document.querySelector('.row2')
        let list_box = row2.querySelector('.list_box')
        let html = ''

        for (let j = 0; j < datas.length; j++) {
            let star: bodyModel<string> = await getcomponent({ path: 'components/star/star.njk', name: 'star', data: {} })

            let imghtml = ''

            for (let i = 0; i < datas[j].atlas.length; i++) {
                imghtml += `<img src="${datas[j].atlas[i]}"/>`
            }

            html += ` <div class="child">
        <div class="l">
          <div class="user">
            <div>
              <img src="${datas[j].hread}"/>
              <i>${datas[j].name}</i>
            </div>
            <p>购买价格:${datas[j].price}</p>
            <p>购买时间:${datas[j].buytime}</p>
            <p>投入使用:${datas[j].actiontime}</p>
          </div>

          <div class="grade">
            <span>用户评分</span>
            <div class="score">
              <span>4.68</span>
              ${star.bodyMessage}
            </div>
            <div class="configuration">
              <p>
                <span>性能:</span>
                <span>${datas[j].xingneng}</span>
              </p>
              <p>
                <span>配置:</span>
                <span>${datas[j].peizhi}</span>
              </p>
              <p>
                <span>外观:</span>
                <span>${datas[j].waiguan}</span>
              </p>
              <p>
                <span>质量:</span>
                <span>${datas[j].zhiliang}</span>
              </p>
              <p>
                <span>售后:</span>
                <span>${datas[j].shouhou}</span>
              </p>
              <p>
                <span>能耗:</span>
                <span>${datas[j].nenghao}</span>
              </p>
              <p>
                <span>自动化:</span>
                <span>${datas[j].zidonghua}</span>
              </p>

            </div>
          </div>

          <div class="more">
            <a href="${datas[j].id}" target="_blank">查看口碑详情</a>
          </div>
        </div>

        <div class="r">
          <p>${datas[j].description}</p>
          <div class="atlas">
           ${imghtml}
          </div>
        </div>
      </div>`
        }
        list_box.innerHTML = html

    })
})()