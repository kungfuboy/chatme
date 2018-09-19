// leopard 豹
// Swallow 燕子
export default {
  '0000': {
    res: [
      {
        user: 'eagle',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'eleven',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'dove',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'falcon',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'leopard',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'sky',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'fire',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'swallow',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'wolf',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'yangxin',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      },
      {
        user: 'leaf',
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。'
      }
    ],
    req: [
      {
        value: '《剑赋》有云：形而上剑，旷古无人。万剑敬仰，奉若天神。',
        next: '0001'
      }
    ]
  },
  // '0000': {
  //   res: [
  //     { user: 'eagle', value: '你好，我叫夜鹰' },
  //     { user: 'eagle', value: '是当年……' },
  //     { user: 'eagle', value: '经历残酷的厮杀角逐后，侥幸当上武协会长的人…' }
  //   ],
  //   req: [
  //     { value: '夜鹰？', next: '0001' },
  //     { value: '我不关心你叫啥', next: '0002' }
  //   ]
  // },
  '0001': {
    res: [
      { user: 'eagle', value: '嗯，夜鹰是我的……' },
      { user: 'eagle', value: '亲切点叫昵称' },
      { user: 'eagle', value: '装X点叫代号' },
      { user: 'eagle', value: '娘炮点叫花名' }
    ],
    req: [
      { value: '所以，你谁啊？', next: '0003' },
      { value: '好吧，然后呢？', next: '0004' }
    ]
  },
  '0002': {
    res: [
      { user: 'eagle', value: '呵呵，哦…' },
      { user: 'eleven', value: '呵呵，该！' },
      { user: 'dove', value: '/偷笑偷笑偷笑偷笑偷笑偷笑偷笑偷笑' }
    ],
    req: [{ value: '嗯？另外两位是谁？', next: '0006' }]
  },
  '0003': {
    res: [
      { user: 'eagle', value: '呵呵，哦…' },
      { user: 'eleven', value: '呵呵，该！' },
      { user: 'dove', value: '/偷笑' }
    ],
    req: [{ value: '嗯？另外两位是谁？', next: '0006' }]
  },
  '0004': {
    res: [
      { user: 'eagle', value: '嗯' },
      { user: 'eagle', value: '呃……' },
      { user: 'eagle', value: '我看看小纸条' },
      { user: 'eagle', value: '噢，欢迎加入武术协会。' },
      { user: 'eagle', value: '如果我还在学校里的话，我会给你们写亲笔信的。' }
    ],
    req: [{ value: '还有这种待遇？', next: '0005' }]
  },
  '0005': {
    res: [
      { user: 'eagle', value: '嗯，当年是有的，但是后来……' },
      { user: 'eagle', value: '唉，可能是将我流放的下一任会长的字比较丑' },
      { user: 'eagle', value: '所以抛弃了这一难能可贵的中华民族优良传统' },
      { user: 'eleven', value: '······' },
      {
        user: 'eagle',
        value: '哦，上面那位穿黄色衣服的就是我所说的，上一任会长。'
      },
      {
        user: 'eagle',
        value:
          '由于他本是一名体育生，因此在他将我流放后，他需要进行体育训练和谈恋爱'
      },
      { user: 'eagle', value: '甚至每天还要花相当多的时间进食' },
      { user: 'eagle', value: '以至于投身在武术协会上的时间少了很多。' },
      {
        user: 'eagle',
        value: '但，在这种情况下，他仍然举办了茂名市第一届学生武术交流会。'
      },
      {
        user: 'eleven',
        value:
          '嗯，我是很低调的，这件事我一直很少对人讲。好汉不提当年勇，没什么值得炫耀的！'
      },
      { user: 'eagle', value: '我来报个料！' },
      { user: 'falcon', value: '料？' },
      { user: 'eagle', value: '那天……' },
      { user: 'falcon', value: '嗯？' },
      { user: 'eagle', value: '十一他……' },
      { user: 'falcon', value: '嗯嗯？' },
      { user: 'eagle', value: '表演的过程中……' },
      { user: 'falcon', value: '嗯嗯嗯？' },
      { user: 'eagle', value: '裤子……崩开了' }
    ],
    req: [
      {
        value: '好劲爆！',
        next: '0006'
      }
    ]
  },
  '0006': {
    res: [
      { user: 'eleven', value: '夜鹰你完了！' },
      { user: 'eagle', value: '略略略……' }
    ],
    req: [{ value: 'kk', next: '0006' }]
  }
}
