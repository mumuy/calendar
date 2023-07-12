
// 闰月数据压缩：1位闰月大小+12位平月大小及4位长度闰月月份转2进制，再转32进制
export const monthData = [
    'iuo','in0','19bg','l6l','1kj0','1mag','2pak','ll0','16mg','lei',
    'in0','19dm','196g','1kig','3kil','1da0','1ll0','1bd2','15dg','2ibn',
    'ibg','195g','1d5l','qig','ra0','3aqk','ar0','15bg','kni','ibg',
    'pb6','1l50','1qig','rkl','mmg','ar0','31n3','14n0','3i6n','1iag',
    '1l50','3m56','1dag','ll0','39dk','9eg','14mg','1kli','1aag','1dan',
    'r50','1dag','2kql','jd0','19dg','2hbj','klg','1ad8','1qag','ql0',
    '1bl6','1aqg','ir0','1an4','19bg','kj0','1sj3','1mag','mqn','ll0',
    '15mg','jel','img','196g','1l6k','1kig','1lao','1da0','1dl0','35d6',
    '15dg','idg','1abk','195g','1cjq','qig','ra0','1bq6','1ar0','15bg',
    'inl','ibg','p5g','t53','1qig','qqo','le0','1ar0','15ml','14n0',
    '1ib0','1mak','1l50','1mig','tai','ll0','1atn','9eg','14mg','1ill',
    '1aag','1d50','1el4','1bag','lep','it0','19dg','2kbm','klg','1a9g',
    'uak','ql0','1bag','mqi','ir0','19n6','1970','1kj0','1qj5','1l9g',
    'ml0','tl3','15mg','inr','img','196g','3k5m','1kig','1l90','1na5',
    '1dd0','lmg','ldi','idg','19bn','195g','1aig','3cil','r90','1bd0',
    '2ir3','14rg','ifo','ibg','p5g','2q56','1qig','qp0','39m4','1an0',
    '18n0','1kn3','1ib0','1lan','1l50','1mig','nal','ll0','19mg','lek',
    'kmg','1ado','1aag','1d50','1dl6','1bag','ld0','1at4','19dg','klg',
    '1cjj','q9g','spn','ql0','1bag','2iql','ir0','19bg','l74','1kb0',
    '1qb8','1l90','1ml0','2ql6','lmg','in0','1aek','18mg','1kag','1sii',
    '1l90'
];

// 农历有效期范围
export const minYear = 1900;
export const minMonth = 1;
export const minDay = 30;
export const maxYear = 2100;
export const maxMonth = 12;
export const maxDay = 31;
