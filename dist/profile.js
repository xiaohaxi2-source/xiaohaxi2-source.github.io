// 个人资料、头像、项目与资源在这里维护。avatar 可填写本地相对路径，如 assets/avatar.jpg。
window.PROFILE = {
  name: '王秀睿',
  englishName: 'WANG XIURUI',
  initials: 'XR',
  role: 'AI 产品经理',
  avatar: '',
  tagline: '从真实的问题出发，\n把想法变成可使用、可验证的产品。',
  bio: '这里整理个人项目、方法清单与产品思考，记录从一个问题到一件作品的过程。欢迎逛逛，也欢迎带着具体的问题一起交流。',
  email: '',
  wechat: '',
  github: 'https://github.com/xiaohaxi2-source',
  repository: 'https://github.com/xiaohaxi2-source/xiaohaxi2-source.github.io',
  projects: [
    {title:'XR OS · 个人主页', type:'已发布', description:'个人介绍、项目和文章集中展示。连续滚动正文，左侧目录自动定位当前栏目。', cover:'desktop', coverTitle:'XR OS', coverSubtitle:'我的作品与思考，在同一个窗口里。', action:'查看公开仓库', href:'https://github.com/xiaohaxi2-source/xiaohaxi2-source.github.io'},
    {title:'知识空间', type:'概念示例', description:'围绕资料检索、知识问答和引用回溯，探索让收藏真正发挥价值的产品构想。', cover:'knowledge', coverTitle:'知识空间', coverSubtitle:'让知识，不止于收藏。', action:'查看项目构想', detail:'knowledge'},
    {title:'小小专注', type:'概念示例', description:'用更少的步骤进入专注，思考完成、暂停与中断时的体验。', cover:'focus', coverTitle:'小小专注', coverSubtitle:'给眼前的一件事，留一点空间。', action:'查看项目构想', detail:'focus'},
    {title:'产品拆解笔记', type:'研究示例', description:'从用户任务、输入与输出、失败路径和证据出发，整理产品观察的方法。', cover:'research', coverTitle:'产品拆解', coverSubtitle:'从功能，走近真实体验。', action:'阅读研究框架', detail:'research'}
  ],
  resources: [
    {title:'个人主页源码与说明', type:'项目文档', description:'网站结构、个人资料维护方式、本地运行和 GitHub Pages 发布说明。', cover:'source', coverTitle:'BUILD IN PUBLIC', coverSubtitle:'个人主页 · 完整源码与维护说明', action:'打开项目说明', href:'https://github.com/xiaohaxi2-source/xiaohaxi2-source.github.io/blob/main/README.md'},
    {title:'产品拆解清单', type:'方法模板', description:'用任务、场景、路径与证据，系统地记录一次产品拆解。', cover:'research', coverTitle:'产品拆解清单', coverSubtitle:'用户任务 / 体验路径 / 证据', action:'下载 Markdown 模板', href:'resources/product-research.md', download:true},
    {title:'用户访谈提纲', type:'访谈模板', description:'从最近一次真实经历出发，记录触发、过程、替代方案和未解决的问题。', cover:'interview', coverTitle:'用户访谈提纲', coverSubtitle:'少问假设，多问发生过的事。', action:'下载 Markdown 模板', href:'resources/user-interview.md', download:true},
    {title:'AI 产品评估清单', type:'评估模板', description:'围绕任务完成、输出质量、可核查性和失败恢复，整理需要验证的内容。', cover:'evaluation', coverTitle:'AI 产品评估', coverSubtitle:'任务 / 质量 / 信任 / 恢复', action:'下载 Markdown 模板', href:'resources/ai-evaluation.md', download:true}
  ],
  writing: [
    {title:'DeepSeek Super-agent：卡住的不是模型，是人的注意力', type:'公众号文章', description:'从任务分工、事件驱动到持久状态，讨论 Agent 如何持续推进工作，减少用户反复派活和盯进度的负担。', image:'assets/articles/deepseek-super-agent.jpg', imageAlt:'被多个消息窗口包围的用户，呈现多任务带来的注意力负担', action:'阅读原文', href:'https://mp.weixin.qq.com/s/z2SSDzhh5W_yretenWN-vg'},
    {title:'给 Codex 配上 REA，AI 复刻软件开始讲证据了', type:'公众号文章', description:'从应用调查到独立实现，观察 Codex 与 REA 如何用证据理解软件，并通过真实操作检验产品是否可用。', image:'assets/articles/codex-rea.jpg', imageAlt:'从应用包结构、证据调查到任务管理软件重建的过程示意', action:'阅读原文', href:'https://mp.weixin.qq.com/s/J6lhOOtYyc3i9elSbL3nXA'},
    {title:'Hugging Face，开源 AI 的模型供应链总站', type:'公众号文章', description:'沿着模型发现、试跑与部署的路径，梳理 Hugging Face 的产品结构，以及选型时的许可证、成本和管理问题。', image:'assets/articles/hugging-face.jpg', imageAlt:'Hugging Face 模型、数据、演示、评估与云端部署的供应链示意', action:'阅读原文', href:'https://mp.weixin.qq.com/s/zYqaAlEUOwQkg9-_tjUP-w'}
  ]
};
