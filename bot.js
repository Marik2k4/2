console.log(`

██╗░░░██╗██╗░░██╗░░░░█████╗░░█████╗░███╗░░░███╗░░░░██╗░█████╗░░██████╗░█████╗░██████╗░███╗░░██╗
██║░░░██║██║░██╔╝░░░██╔══██╗██╔══██╗████╗░████║░░░██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗░██║
╚██╗░██╔╝█████═╝░░░░██║░░╚═╝██║░░██║██╔████╔██║░░██╔╝░██║░░██║╚█████╗░██║░░╚═╝██████╔╝██╔██╗██║
░╚████╔╝░██╔═██╗░░░░██║░░██╗██║░░██║██║╚██╔╝██║░██╔╝░░██║░░██║░╚═══██╗██║░░██╗██╔══██╗██║╚████║
░░╚██╔╝░░██║░╚██╗██╗╚█████╔╝╚█████╔╝██║░╚═╝░██║██╔╝░░░╚█████╔╝██████╔╝╚█████╔╝██║░░██║██║░╚███║
░░░╚═╝░░░╚═╝░░╚═╝╚═╝░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚═╝░░░░░╚════╝░╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░╚══╝
`);
const { VK } = require('vk-io');
const vk = new VK();
const user = new VK();
user.setOptions({
token: '8969eac85cbbf92bcc3937d3b788f267c1139ed9a4d5a362a0994fe827187f3e33ea685706ba218456696' // user token
});

vk.setOptions({ 
token: '8969eac85cbbf92bcc3937d3b788f267c1139ed9a4d5a362a0994fe827187f3e33ea685706ba218456696', // group token
pollingGroupId: 198301847});
const { updates, snippets } = vk;

const badcode = [];
const request = require('prequest');
const rq = require("prequest");
const fs = require("fs");


const promo = require('./promo.json');
let users = require('./users.json');
let buttons = [];

setInterval(async () => {
	await saveUsers();
}, 3000);

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club179740381\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club179740381\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await user.api.users.get({ user_id: message.senderId, fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, occupation, nickname, relatives, relation, personal, connections, exports, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me"});
		const date = new Date();

		users.push({
			tag: user_info.first_name,
			domain: user_info.domain,
			id: message.senderId,
			uid: users.length,
			adm: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
			balance: 5000,
			bank: 0,
			btc: 0,		
			business: 0,	
			biz: 0,
			bizlvl: 0,		
			energy: 10,
			zhelezo: 0,
			zoloto: 0,
			almaz: 0,
			uran: 0,							
			mention: true,
			ban: false,	
			banreport: false,
			report: false,
			work: 0,
			stag: 0,						
			opit: 0,
			warn: 0,
			wreason: `Нет`,			
			floder: 0,
			foolder: 0,	
			home: 0,
			car: 0,
			bicycle: 0,
			airplane: 0,
			pet: 0,
			plvl: 0,
			petpoxod: 0,			
			pk: 0,
			sotik: 0,
			operator: 1,
			number: 0,
			numon: false,			
			timers: {
				hasWorked: false,				
				bonus: false,
				report: false,
			}
		});

		message.send(` 
&#8195;&#8195; [Регистрация пройдена] 
&#8195;&#8195;&#8195; Автор проекта: [oscrn|Djozeff] 
&#8195;&#8195;&#8195;&#8195;Канал: Типичный кодер. 

➥ Для продолжения, напишите "Помощь"`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "❓ Помощь"
			},
			"color": "default"
			}]
		]
			})
		});	
}
	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return message.send(`🚫 К сожалению, вы забанены.`);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if (message.text) {
		message.user.floder += 1;
	}

	const command = badcode.find(x=> x[0].test(message.text));
	if(!command) return;

	if(message.user.warn >= 3)
	{
		message.user.ban = true;
		vk.api.messages.send({ user_id: message.user.id, message: `❗ Вам было выдано большое количество варнов от администраторов.\n🚫 К сожалению, вы забанены в боте.` });
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]: ${message.text}`)
});

const oscrn = 	(a, b) =>  { 
 {
		badcode.push([a, b]);
	}
}

oscrn(/^❓ помощь|помощь$/i, async (message, bot) => { 
	message.user.foolder += 1;
	await message.send(`
❓ Список команд:
⠀⠀📘 Профиль
⠀⠀💲 Баланс
⠀⠀💰 Банк [сумма/снять сумма]
⠀⠀📞 Ник [Прозвище]
⠀⠀🗺 Магазин⠀⠀
⠀⠀🎯 Продать [Предмет]
⠀⠀🐒 Питомец - информация
⠀⠀🌟 Питомец улучшить 
⠀⠀🐪 Питомец поход 
⠀⠀🙈 Питомец найти	

🚀 Игровые:
⠀⠀🃏 Покер [синий/зеленый/черный] [ставка]
⠀⠀🎲 Кубик [число 1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀👒 Квесты	⠀⠀
⠀⠀🍂 Копать
⠀⠀✈ Летчик
⠀⠀🚘 Таксовать
⠀⠀🙊 Анекдот
⠀⠀⏳ Шар [фраза]
⠀⠀💬 Выбери [фраза] или [фраза2]
⠀⠀📊 Инфа [фраза]
⠀⠀💎 Бонус
	
🍀 Разное:
⠀⠀📈 Бизнес - ваш бизнес
⠀⠀💵 Бизнес снять - снять деньги с бизнеса
⠀⠀👔 Работа - список работ
⠀⠀🔨 Работать - заработать денег
⠀⠀❌ Уволиться - перестать работать

🆘 Репорт [текст]`);
});	

oscrn(/^(?:анекдот)$/i, async (message, bot) => {

	let textanek = utils.pick(['Разговариваают два американца:\n — У этих русских не только душа другая. Они и устроены по-другому.\n — ?\n — Я сам слышал как один сказал другому — Одень ты на х@й шапку, а то уши замерзнут.', 'Бывает, борешься за что-то, борешься, а потом в один прекрасный момент понимаешь: «А пошло оно все на х@й! » И жить становится намного проще.', '"А это точно поможет? ", — недоверчиво спрашивала царевна Несмеяна, поднося к губам какую-то самокрутку.', 'Чтобы хоть как-то привлечь внимание школьников, преподавательница написала на доске « Жесть. Смотреть всем».', 'Если Патриарх Кирилл верит в Бога, то почему он ездит в бронированном Мерседесе под охраной ФСО за счет бюджета, а не надеется на заступничество своего небесного начальника?']);

	return bot(`анекдот: 

	${textanek}`)
});

oscrn(/^(?:шар)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"']);
	return bot(phrase);
});

oscrn(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});

oscrn(/^профиль|прф|проф$/i, async (message, bot) => { 
	message.user.foolder += 1;
			let text = ``;

    text += `📘 Ник: ${message.user.tag}\n`;
    text += `🎈 Игровой айди: ${message.user.uid}\n`;
	text += `🆔 Цифровая ссылка: vk.com/id${message.user.id}\n`;
    text += `🆔 Обычная ссылка: vk.com/${message.user.domain}\n`;    
    text += `♥ Привилегия:  ${message.user.adm.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Разработчик")}\n`;
	text += `🏆 Опыт: ${utils.sp(message.user.opit)}\n`;	
	{
        if(message.user.car || message.user.bicycle || message.user.pet || message.user.airplane || message.user.sotik || message.user.number ||
		message.user.home || message.user.pk)
 	{
		text += `\n 🍀 Имущество:\n`;

		if(message.user.car) text += `\n🚗 Машина: ${cars[message.user.car - 1].name}`;
		if(message.user.bicycle) text += `\n🚴‍♂ Велосипед: ${bicycles[message.user.bicycle - 1].name}`;
		if(message.user.airplane) text += `\n🛩 Самолёт: ${airplanes[message.user.airplane - 1].name}`;
		if(message.user.sotik) text += `\n📱 Телефон: ${phones[message.user.sotik - 1].name}`;
		if(message.user.sotik)	text += `\n📱 Оператор: ${message.user.operator.toString().replace(/1/gi, "Отсутствует \n💽 Купить SIM: Купить номер").replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Oscrn Ru").replace(/6/gi, "Мтс")}`;
		if(message.user.number) text += `\n📱 Номер телефона: +79${message.user.number}`;
        if(message.user.home) text += `\n🏠 Дом: ${homes[message.user.home - 1].name}`;
		if(message.user.pet) text += `\n🐌 Питомец: ${pets[message.user.pet - 1].name}`;}
		if(message.user.pk) text += `\n💻 Компьютер: ${peka[message.user.pk - 1].name}`;
		if(message.user.business) text += `\n💾 Бизнес: ${businesses[message.user.business - 1].name}\n`
		}
	text += `\n⛏ Работа под номером: ${message.user.work}\n`		
	text += `\n⚠ Предупреждений: [${message.user.warn}/3]`;
	text += `\n⚠ Бан репорта: ${message.user.banreport ? "Есть [❌]": "Нету [✅]"}\n`;
	text += `\n📈 Статистика « 📉`;
	text += `\n📩 Всего сообщений: ${message.user.floder}`;
	text += `\n📥 Всего команд: ${message.user.foolder}`;
	text += `\n✔ Дата регистрации: ${message.user.regDate}\n`;
	return message.send(`📕 » Ваш профиль « 📕\n${text}`);
});	

oscrn(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mention = true;
		return bot(`⚠ Гиперссылка включена`);
	}

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mention = false;
		return bot(`⚠ Гиперссылка отключена`);
	}
});

oscrn(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);

	message.user.tag = message.args[1];
	return bot(`🎉 Поздравляю, ваш новый игровой ник: "${message.user.tag}"`);
});


oscrn(/^(?:бонус)$/i, async (message, bot) => {
	if(message.user.timers.bonus) return bot(`Вы уже получали бонус за эти 24 часа, подождите 24 часа, и можете открыть еще раз бонус.`);
	let bonus = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;

	if(bonus === 1)
	{
		message.user.balance += 50000;
		return message.send(`⚓ Вы выиграли: 50.000$`);
	}

	if(bonus === 2)
	{
		message.user.btc += 100;
		return message.send(`⚓ Вы выиграли: 100₿`);
	}

	if(bonus === 3)
	{
		message.user.balance += 75000;
		message.user.btc += 46;
		return message.send(`⚓ Вы выиграли: 75.000$ и 46₿`);
	}

	if(bonus === 4)
	{
		message.user.btc += 15;
		return message.send(`⚓ Вы выиграли: 15₿`);
	}

	if(bonus === 5)
	{
		message.user.balance += 25000;
		return message.send(`⚓ Вы выиграли: 25.000$`);
	}
});

oscrn(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`На данный момент, ваша работа ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Отдохните 10 минут, и продолжайте работать` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.lvl) return bot(`Вы не можете устроиться на эту работу, ваш уровень слишком мал`);

	else if(work.requiredLevel <= message.user.lvl)
	{
		message.user.work = work.id;
		return bot(`Вы успешно устроились на работу ${work.name}
		👔 Введите команду "Работать"`);
	}
});

oscrn(/^(?:работа)$/i, async (message, bot) => {
	if(message.user.work) return bot(`На данный момент, ваша работа ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Отдохните 10 минут, и продолжайте работать` : ``}`);
	return bot(`Список работ:
	✅ 1. Грузчик - зарплата ~10.000$
	✅ 2. Водитель автобуса - зарплата ~20.000$
	✅ 3. Водитель скорой помощи - зарплата ~30.000$
	✅ 4. Помощник машиниста - зарплата ~40.000$
	✅ 5. Машинист - зарплата ~50.000$
	
	Что-бы устроиться на работу, введите "Работа [номер работы]`);
});

oscrn(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`😩 Вы еще не устроились на работу\nДля трудоустройства введите "Работа"`);
		
		if(message.user.timers.hasWorked) return bot(`Ваша смена была закончена\n⏳ Вы сможете работать только через 10 минут`);
	
	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);
		
	
	if(message.user.timers.hasWorked) return bot(`Ваша смена была закончена\n⏳ Вы сможете работать только через 10 минут`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);

	message.user.timers.hasWorked = true;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

	return bot(`💵 Ваша смена была закончена\n💵 Вы заработали ${utils.sp(earn)}$`);
	

});

oscrn(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`Вы еще не устроились на работу`);
	
	message.user.work = 0;
	return bot(`Эх, уволился самый лучший сотрудник...`);
});

oscrn(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.isChat) return message.reply(`❗ ${message.user.tag}, к сожалению, Вы не можете писать репорт в беседе.`);
	if(message.user.banreport == true) return message.reply('😕 Вам запрещено писать в репорт.')

       let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(нахой|посрать|блядь|бляд|блять|бляь|блят|блядт|бля|📬|🥃|👨‍|🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|😀|😃|😄|😁|😆|😅|😂|🤣|☺|😊|😇|🙂|🙃|😉|😌|😍|😘|😗|😙|😚|😋|😜|😝|😛|🤑|🤗|🤓|😎|🤡|🤠|😏|😒|😞|😔|😟|😕|🙁|☹|😣|😖|😫|😩|😤|😠|😡|😶|😐|😑|😯|😦|😧|😮|😲|😵|😳|😱|😨|😰|😢|😥|🤤|😭|😓|😪|😴|🙄|🤔|🤥|😬|🤐|🤢|🤧|😷|🤒|🤕|😈|👿|👹|👺|💩|👻|💀|☠|👽|👾|🤖|🎃|😺|😸|😹|😻|😼|😽|🙀|😿|😾|👐|🙌|👏|🙏|🤝|👍|👎|👊|✊|🤛|🤜|🤞|✌|🤘|👌|👈|👉|👆|👇|☝|✋|🖐|🖖|👋|🤙|💪|🖕|✍|🤳|💅|🖖|💄|💋|👄|👅|👂|👃|👤|👣|👁|👀|🗣|👥|👶|👦|👧|👨|👩|👱‍♀️|👱|👴|👵|👲|👳‍♀️|👳|👮‍♀️|👮|👷‍♀️|👷|💂‍♀️|💂|🕵‍♀️|🕵|👩‍⚕️|👨‍⚕️|👩‍🌾️|👨‍🌾️|👩‍🍳️|👨‍🍳️|👩‍🎓️|👨‍🎓️|👩‍🎤️|👨‍🎤️|👩‍🏫️|👨‍🏫️|👩‍🏭️|👨‍🏭️|👩‍💻️|👨‍💻️|👩‍💼️|👨‍💼️|👩‍🔧️|👨‍🔧️|👩‍🔬️|👨‍🔬️|👩‍🎨️|👨‍🎨️|👩‍🚒️|👨‍🚒️|👩‍✈️|👨‍✈️|👩‍🚀️|👨‍🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|🎓|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|#|жопа|проебу|анально|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
    return message.send(`😇 Пожалуйста, задавайте в репорте вопросы, а иначе получите бан репорта.\n✉ Причина: Нельзя использовать символы/маты в репортах.`);
}
	message.user.report = true;
	    for(a=0;a<users.length;a++){
     	let user = users[a];
  
         if(user) {
        	if(user.adm >= 1) {               
                 vk.api.messages.send({ 
                    user_id: user.id, 
                    message: `🌈 REPORT \n🆔 USER: @id${message.user.id}\n📩 GAME ID: ${message.user.uid}\n📜 TEXT: \n${message.args[1]}`, 
                    random_id: 0 
                }).catch((error) => {console.log('report error:\n'+error); });                  
             }
          }
      }
      return message.send(`💬 Репорт принят в обработку. \n👤 Ожидайте ответа администрации.`); 
});

oscrn(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => { 
			if(message.user.adm < 1) return;
admlogs(message)
message.user.foolder += 1;
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	user.report = false;
	vk.api.messages.send({ user_id: user.id, message: `
💬 Поступил ответ на ваш репорт:
📩 Ответ: ${message.args[2]}` });	
	return message.send(`📙 [id${message.user.id}|${message.user.tag}], ответ отправлен.`)


});

oscrn(/^(?:баланс|💸 Баланс)$/i, async (message, bot) => {
		let text = `🔥 @id${message.user.id} (${message.user.tag}), ваши сбережения: 
		
		🤑 На руках ${utils.sp(message.user.balance)}$`;
	
		if(message.user.bank) text += `\n💳 На карте ${utils.sp(message.user.bank)}$`;
		if(message.user.btc) text += `\n🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`;
		if(message.user.zhelezo) text += `\n🎛 ${utils.sp(message.user.zhelezo)} железа`;
		if(message.user.zoloto) text += `\n🏵 ${utils.sp(message.user.zoloto)} золота`;
		if(message.user.almaz) text += `\n💎 ${utils.sp(message.user.almaz)} алмаза`;
		if(message.user.uran) text += `\n🌌 ${utils.sp(message.user.uran)} антиматерии`;
	
	message.send(`${text}`);
	});

oscrn(/^(?:банк|💳 Банк)$/i, async (message, bot) => {
		if(message.user.bank < 1) return bot(`ваш банковский счет пуст. 😬`);
		bot(`на балансе в банке ${utils.sp(message.user.bank)}$ игровой валюты 🔥
		💰 Введите "Банк [кол-во]" для пополнения`);
	});

oscrn(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
		message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
		message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
		message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
		message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);
	
		if(!Number(message.args[1])) return;
		message.args[1] = Math.floor(Number(message.args[1]));
	
		if(message.args[1] <= 0) return;
	
		if(message.args[1] > message.user.bank) return bot(`у вас нет данной суммы. 😬`);
		else if(message.args[1] <= message.user.bank)
		{
			message.user.balance += message.args[1];
			message.user.bank -= message.args[1];
	
			return bot(`вы сняли ${utils.sp(message.args[1])}$
			🔥 Остаток на счёте: ${utils.sp(message.user.bank)}$
	💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
		}
	});

oscrn(/^(?:банк)\s(.*)$/i, async (message, bot) => {
		message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
		message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
		message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
		let babka = message.user.bank + message.args[1];
		message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
		if(!Number(message.args[1])) return;
		message.args[1] = Math.floor(Number(message.args[1]));
		if(message.args[1] > 1000000000000) return bot(`ложить в банк можно лишь 1 трлн!`)
	
		if(message.user.adm > 2) return bot(`администратор не может пополнять банковский счёт. 🚫`);
		if(message.args[1] < 1) return bot(`на балансе в банке ${utils.sp(message.user.bank)}$
	✍🏻 Введите "Банк снять [кол-во]" для снятия`);
	
	
		if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег.🚫`);
		if(message.args[1] > babka) return bot(`в банке можно хранить только 1 трлн!`)
		else if(message.args[1] <= message.user.balance)
		{
			message.user.balance -= message.args[1];
			message.user.bank += message.args[1];
	
			return bot(`вы положили в банк ${utils.sp(message.args[1])}$ 💸
			🔥 Остаток на балансе ${utils.sp(message.user.balance)}$`);
		}
	});

oscrn(/^(?:копать)$/i, async (message, bot) => { 
if(message.isChat) return bot(`команда работает только в ЛС. 🔁`);
return bot(`использование: «копать железо/золото/алмазы/антиматерию» 😔`);

});

oscrn(/^(?:копать железо|🎛 Копать железо|@sm4bot 🎛 Копать железо)$/i, async (message, bot) => { 
if(message.isChat) return bot(`команда работает только в ЛС. 🔁`);
if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);
let a = 0;
if(message.user.zelya === 2) a += 45;

message.user.energy -= 1;
message.user.opit += 1;
message.user.zhelezo += randzhelezo;
message.user.zhelezo += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🎛 Копать железо` 
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

return bot(`+${randzhelezo} железа.
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🎛 Копать железо` 
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

oscrn(/^(?:копать золото|🏵 Копать золото)$/i, async (message, bot) => { 
if(message.isChat) return bot(`команда работает только в ЛС. 🔁`);
if(message.user.opit < 300) return bot(`что бы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzoloto = utils.random(5, 35);
let a = 0;
if(message.user.zelya === 2) a += 15;

message.user.energy -= 1;
message.user.opit += 2;
message.user.zoloto += randzoloto;
message.user.zoloto += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🏵 Копать золото`
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

return bot(`+${randzoloto} золота.
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🏵 Копать золото`
}, 
"color": "positive" 
}] 
] 
})
});

}

});

oscrn(/^(?:копать алмазы|💎 Копать алмазы)$/i, async (message, bot) => { 
if(message.isChat) return bot(`команда работает только в ЛС. 🔁`);
if(message.user.opit < 3000) return bot(`что бы копать алмазы нужно больше 3 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(1, 4);
let a = 0;
if(message.user.zelya === 2) a += 2;

message.user.energy -= 1;
message.user.opit += 3;
message.user.almaz += randalmaz;
message.user.almaz += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💎 Копать алмазы`
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);
return bot(`+${randalmaz} алмазов.
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💎 Копать алмазы`
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

oscrn(/^(?:копать антиматерию|🌌 Копать антиматерию)$/i, async (message, bot) => { 
if(message.isChat) return bot(`команда работает только в ЛС. 🔁`);
if(message.user.opit < 99999) return bot(`что бы копать антиматерию нужно больше 100 000 опыта. Копайте железо/золото/алмазы и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randuran = utils.random(1, 2);
let a = 0;
if(message.user.zelya === 2) a += 1;

message.user.energy -= 1;
message.user.opit += 50;
message.user.uran += randuran;
message.user.uran += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randuran} антиматерии. 🌌
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🌌 Копать антиматерию`
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

return bot(`+${randuran} антиматерии. 🌌
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🌌 Копать антиматерию`
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

oscrn(/^(?:кубик|куб|🎲 кубик)\s([1-6])$/i, async (message, bot) => {
			const int = utils.pick([1, 2, 3, 4, 5, 6]);
			if(int == message.args[1])
			{
				progressQuest(message.user, 2)
				message.user.balance += 2000000;
				return bot(`вы угадали! Приз 2.000.000$`);
			} else { 
				resetQuest(message.user, 2)
				return bot(`не угадали 
			🎲 Выпало число ${int}`, 
		{ 
		keyboard:JSON.stringify( 
		{
		"inline": true,
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": `🎲 кубик ${message.args[1]}` 
		}, 
		"color": "default" 
		}] 
		] 
		}) 
		});
		
		}
		
		});
		
oscrn(/^(?:казино|🎲 казино)\s?(.*)?$/i, async (message, bot) => {
			message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
			message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
			message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
			message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
			let smilelose = utils.pick(['','','','','','','','']);
			let smilewin = utils.pick(['','','','','','','','','','','','','','','','','','',''])
		
			let proigrish1 = 0.75;
			let proigrish2 = 0.50;
			let proigrish3 = 0.25;
			
			
			if(!Number(message.args[1])) return;
			message.args[1] = Math.floor(Number(message.args[1]));
			
			if(message.args[1] <= 0) return;
			if(message.args[1] < 49) return bot(`ставка должна быть выше 50! 🎲`)
			
			if(message.user.balance == 0 || message.user.balance < 1) return bot(`у вас нет денег.`)
			if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
			else if(message.args[1] <= message.user.balance && message.user.balance <= 50000000000) 
			{ 
			message.user.balance -= message.args[1]; 
			const multiply = utils.pick([0, 0, 2, 0, 50, 1, 0.75, 2, 1, 0, 5, 2, 3, 3, 3, 1, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 5, 0.5, 0.5, 0.75, 0.75, 0.75, 5, 0.75, 0.75, 5, 0.75]); 
			
			message.user.balance += Math.floor(message.args[1] * multiply); 
			
			if (multiply > 1)
			progressQuest(message.user, 3)
			else
			resetQuest(message.user, 3)
			
			return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply === 0.75 ? `вы проиграли ${utils.sp(message.args[1] * proigrish3)}$` : `${multiply === 0.25 ? `вы проиграли ${utils.sp(message.args[1] * proigrish1)}$` : `${multiply === 0 ? `вы проиграли ${utils.sp(message.args[1] * 1)}$ ✖` : `${multiply === 0.50 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}`}`}`} (x${multiply})
				💰 Баланс: ${utils.sp(message.user.balance)}$`, 
				{ 
				keyboard:JSON.stringify( 
				{
				"inline": true,
				"buttons": [ 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": `🎲 Казино ${message.args[1]}` 
				}, 
				"color": "default"  
				}] 
				] 
				}) 
				}) 
			} 
			
			else if(message.args[1] <= message.user.balance && message.user.balance > 50000000000 && message.user.balance <= 300000000000) 
			{ 
			message.user.balance -= message.args[1]; 
			const multiply = utils.pick([0, 0, 0, 0.25, 0.50, 0.75, 0.25, 0, 10, 1, 5, 5, 1, 0, 0, 2, 0, 50, 1, 0.75, 2, 1, 0, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 
			
			message.user.balance += Math.floor(message.args[1] * multiply);
			
			if (multiply > 1)
			progressQuest(message.user, 3)
			else
			resetQuest(message.user, 3)
			
			return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply === 0.75 ? `вы проиграли ${utils.sp(message.args[1] * proigrish3)}$` : `${multiply === 0.25 ? `вы проиграли ${utils.sp(message.args[1] * proigrish1)}$` : `${multiply === 0 ? `вы проиграли ${utils.sp(message.args[1] * 1)}$ ✖` : `${multiply === 0.50 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}`}`}`} (x${multiply})
				💰 Баланс: ${utils.sp(message.user.balance)}$`, 
				{ 
				keyboard:JSON.stringify( 
				{
				"inline": true,
				"buttons": [ 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": `🎲 казино ${message.args[1]}` 
				}, 
				"color": "default"  
				}] 
				] 
				}) 
				})
			} 
			
			else if(message.args[1] <= message.user.balance && message.user.balance > 300000000000 && message.user.balance <= 1000000000000) 
			{ 
			message.user.balance -= message.args[1]; 
			const multiply = utils.pick([ 0, 0.75, 1, 0.25, 0.75, 1, 0.25, 0.25, 0, 0, 0, 0, 0, 0, 0, 5, 1, 3, 3, 0, 0, 2, 0, 50, 1, 0.75, 2, 1, 0, 3, 1, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 
			
			message.user.balance += Math.floor(message.args[1] * multiply); 
			
			if (multiply > 1)
			progressQuest(message.user, 3)
			else
			resetQuest(message.user, 3)
			
			return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply === 0.75 ? `вы проиграли ${utils.sp(message.args[1] * proigrish3)}$` : `${multiply === 0.25 ? `вы проиграли ${utils.sp(message.args[1] * proigrish1)}$` : `${multiply === 0 ? `вы проиграли ${utils.sp(message.args[1] * 1)}$ ✖` : `${multiply === 0.50 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}`}`}`} (x${multiply})
				💰 Баланс: ${utils.sp(message.user.balance)}$`, 
				{ 
				keyboard:JSON.stringify( 
				{
				"inline": true,
				"buttons": [ 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": `🎲 казино ${message.args[1]}` 
				}, 
				"color": "default"  
				}] 
				] 
				}) 
				})
			}
			
			else if(message.args[1] <= message.user.balance && message.user.balance > 1000000000000 && message.user.balance <= 10000000000000) 
			{ 
			message.user.balance -= message.args[1]; 
			const multiply = utils.pick([ 0, 0.75, 1, 0.25, 0.75, 1, 0.25, 0.25, 0, 0, 0, 0, 0, 2, 1,  0, 0, 1, 3, 0, 0, 2, 0, 50, 1, 0.75, 2, 1, 0, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 
			
			message.user.balance += Math.floor(message.args[1] * multiply); 
			
			if (multiply > 1)
			progressQuest(message.user, 3)
			else
			resetQuest(message.user, 3)
			
			return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply === 0.75 ? `вы проиграли ${utils.sp(message.args[1] * proigrish3)}$` : `${multiply === 0.25 ? `вы проиграли ${utils.sp(message.args[1] * proigrish1)}$` : `${multiply === 0 ? `вы проиграли ${utils.sp(message.args[1] * 1)}$ ✖` : `${multiply === 0.50 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}`}`}`} (x${multiply})
				💰 Баланс: ${utils.sp(message.user.balance)}$`, 
				{ 
				keyboard:JSON.stringify( 
				{
				"inline": true,
				"buttons": [ 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": `🎲 казино ${message.args[1]}` 
				}, 
				"color": "default"  
				}] 
				] 
				}) 
				})
			} 
			else if(message.args[1] <= message.user.balance && message.user.balance > 10000000000000)
			{ 
			message.user.balance -= message.args[1]; 
			const multiply = utils.pick([0.25, 0.25, 1, 1, 2, 2, 0, 2, 0, 2, 2, 0, 0.75, 1, 0.25, 0.75, 1, 0.25, 0.25, 0, 0, 0, 0.75, 0.25, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0.75, 1, 0.25, 0.75, 1, 0.25, 0.25, 0, 0, 0, 0.75, 2, 2, 1, 0.25, 0.25, 0.75, 1, 2, 2, 0.25, 0.75, 1, 0.25, 0.25, 0.75, 1, 0.25, 0.75, 2, 2, 0.25, 0.75, 1, 0.25, 0.75, 0.25, 0.75, 1, 0.25, 0.75, 0.25, 0.75, 1, 0.25, 0.75, 0.25, 0.75, 1, 0.25, 0.75, 1, 2, 2, 5, 2, 1, 0.50, 0.25, 0.25, 0.75, 0.50, 0.25, 0.25, 0.75, 0.50, 0.25, 0.75, 0.50, 5, 1, 2, 0.50, 0.25, 0, 1, 2, 2, 5, 2, 1, 2, 5, 0, 0.25, 0, 1, 0, 1, 0, 2, 1, 0.25, 0.75, 0.50, 2, 0]); 
			
			message.user.balance += Math.floor(message.args[1] * multiply); 
			
			if (multiply > 1)
			progressQuest(message.user, 3)
			else
			resetQuest(message.user, 3)
			
			return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply === 0.75 ? `вы проиграли ${utils.sp(message.args[1] * proigrish3)}$` : `${multiply === 0.25 ? `вы проиграли ${utils.sp(message.args[1] * proigrish1)}$` : `${multiply === 0 ? `вы проиграли ${utils.sp(message.args[1] * 1)}$ ✖` : `${multiply === 0.50 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}`}`}`} (x${multiply})
				💰 Баланс: ${utils.sp(message.user.balance)}$`, 
			{ 
			keyboard:JSON.stringify( 
			{
			"inline": true,
			"buttons": [ 
			[{ 
			"action": { 
			"type": "text", 
			"payload": "{}", 
			"label": `🎲 казино ${message.args[1]}` 
			}, 
			"color": "default"  
			}] 
			] 
			}) 
			})
			}
			});
		
oscrn(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
			message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
			message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
			message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
			message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
		
			if(!Number(message.args[2])) return;
			message.args[2] = Math.floor(Number(message.args[2]));
		
			if(message.args[2] <= 0) return;
		
			let smilekazinobad = utils.pick([`😒`, `😯`, `😔`, `😕`]);
		
			if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smilekazinobad}`);
			if(message.args[2] <= 50) return bot(`ставка должна быть больше 50$ ${smilekazinobad}`);
			else if(message.args[2] <= message.user.balance)
			{
				message.user.balance -= message.args[2];
		
				const rand = utils.pick([0, 1]);
				const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));
		
				if(rand === nav)
				{
					progressQuest(message.user, 0)
		
					const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
					message.user.balance += Math.floor(message.args[2] * multiply);
		
					return bot(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
					✅ Вы заработали +${utils.sp(message.args[2] * multiply)}$
					💰 Баланс: ${utils.sp(message.user.balance)}$`);
				} else {
					resetQuest(message.user, 0)
					return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
					❌ Вы потеряли ${utils.sp(message.args[2])}$ 
					💰 Баланс: ${utils.sp(message.user.balance)}$`);
				}
			}
		});
		
oscrn(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
			message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
			message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
			message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
			message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
		
			if(!Number(message.args[2])) return;
			message.args[2] = Math.floor(Number(message.args[2]));
		
			if(message.args[2] <= 0) return;
		
			let smilekazinobad = utils.pick([`😒`, `😯`, `😔`, `😕`]);
		
			if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smilekazinobad}`);
			if(message.args[2] <= 50) return bot(`ставка должна быть больше 50$ ${smilekazinobad}`);
			else if(message.args[2] <= message.user.balance)
			{
				message.user.balance -= message.args[2];
		
				const rand = utils.pick([0, 1]);
				const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));
		
				if(rand === nav)
				{
					progressQuest(message.user, 0)
		
					const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
					message.user.balance += Math.floor(message.args[2] * multiply);
		
					return bot(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
					✅ Вы заработали +${utils.sp(message.args[2] * multiply)}$
					💰 Баланс: ${utils.sp(message.user.balance)}$`);
				} else {
					resetQuest(message.user, 0)
					return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
					❌ Вы потеряли ${utils.sp(message.args[2])}$ 
					💰 Баланс: ${utils.sp(message.user.balance)}$`);
				}
			}
		});

oscrn(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
			message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
			message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
			message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
			message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
		
			if(!Number(message.args[2])) return;
			message.args[2] = Math.floor(Number(message.args[2]));
		
			if(message.args[2] <= 0) return;
		
			if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег 😔
		💰 Ваш баланс: ${message.user.balance}$`);
			else if(message.args[2] <= message.user.balance)
			{
				message.user.balance -= message.args[2];
		
				const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65]);
				const cup = utils.random(1, 3);
		
				if(cup == message.args[1])
				{
					progressQuest(message.user, 1)
					message.user.balance += Math.floor(message.args[2] * multiply);
					return bot(`вы угадали! Приз ${message.args[2] * multiply} 🙂`);
				} else {
					resetQuest(message.user, 1)
					return bot(`вы не угадали, это был ${cup}-ый стаканчик 😔`);
				}
			}
		});


oscrn(/^(?:Покер|🎲)\s(синий|зелёный|чёрный)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[2] <= 0) return;
	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег 😔`);
	if(message.args[2] <= 500) return bot(`ставка должна быть больше 500$ 😔`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];
		const rand = utils.pick([0, 1]);
		const szc = utils.pick([`Синий`,`зелёный`,`чёрный`]);
		const nav = Number(message.args[1].toLowerCase().replace(/синий/, '1').replace(/зелёный/, '2').replace(/чёрный/, '3'));
		if(rand === nav)
		{
			const multiply = utils.pick([1, 0.80, 3, 0.95, 1.25, 1.5, 2.75, 2, 1.5]);
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`Выпала ${nav === 1 ? `Таже⤴` : `Другая⤵`}
			✅ Вы заработали +${utils.sp(message.args[2] * multiply)}$
			💰 Баланс: ${utils.sp(message.user.balance)}$`,
			{ 
			keyboard:JSON.stringify( 
			{
			"inline": true,
			"buttons": [ 
			[{ 
			"action": { 
			"type": "text", 
			"payload": "{}", 
			"label": `🎲 ${szc} ${message.args[2]}` 
			}, 
			"color": "default"  
			}] 
			] 
			}) 
			})
		} else {
			return bot(`Выпала ${nav === 2 ? `Таже⤴` : `Другая⤵`}
			❌ Вы потеряли ${utils.sp(message.args[2])}$ 
			💰 Баланс: ${utils.sp(message.user.balance)}$`,
			{ 
			keyboard:JSON.stringify( 
			{
			"inline": true,
			"buttons": [ 
			[{ 
			"action": { 
			"type": "text", 
			"payload": "{}", 
			"label": `🎲 ${szc} ${message.args[2]}` 
			}, 
			"color": "default"  
			}] 
			] 
			}) 
			})
		}
	}
			});

oscrn(/^(?:задания|квесты|квест|👒 Квесты|👒Квесты)$/i, (message, bot) => {
if ( !('quests' in message.user) )
message.user.quests = quests.map(item => { return 0 })

let lines = [`доступные квесты:`, '']

quests.map( (quest, i) => {
lines.push(`${message.user.quests[i] >= quest.actions ? '✅' : '📦'} ${i + 1}. ${quest.name} (${utils.sp(quest.reward)}$)`) //message.user.quests.filter( (current, j) => i == j )[0] >= quest.action
})

lines.push('', '🔥 Квесты обновляются раз в 24 часа!')

return bot(lines.join('\n'))
})

oscrn(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {

	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '✅' : '⛔'} 1. Автомойка - 5.000$
⠀ ⠀ ⠀ Прибыль: 400$/час
${message.user.business === 2 ? '✅' : '⛔'} 2. РосПечать - 15.000$
⠀ ⠀ ⠀ Прибыль: 700$/час
${message.user.business === 3 ? '✅' : '⛔'} 3. Магазин - 30.000$
⠀ ⠀ ⠀ Прибыль: 2.500$/час
${message.user.business === 4 ? '✅' : '⛔'} 4. Супер-маркет - 45.000$
⠀ ⠀ ⠀ Прибыль: 3.800$/час
${message.user.business === 5 ? '✅' : '⛔'} 5. Командор - 60.000$
⠀ ⠀ ⠀ Прибыль: 18.000$/час
${message.user.business === 6 ? '✅' : '⛔'} 6. Аллея - 175.000$
⠀ ⠀ ⠀ Прибыль: 70.000$/час
${message.user.business === 7 ? '✅' : '⛔'} 7. Спортмастер - 190.000$
⠀ ⠀ ⠀ Прибыль: 120.000$/час

Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`Извините, но вы уже имеете бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег \n Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

oscrn(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`Вы не владеете никаким бизнесом`);
	const biz = businesses.find(x=> x.id === message.user.business);

	return bot(`Статистика бизнеса "${biz.name}":
	💸 Вы получаете: ${utils.sp(biz.earn)}$/час
	💰 На счету бизнеса сейчас находится: ${utils.sp(message.user.biz)}$`);
});

oscrn(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`Вы не владеете никаким бизнесом`);
	if(!message.user.biz) return bot(`На счету вашего бизнеса, нету денег`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`Вы сняли со счёта своего предприятия ${utils.sp(biz_balance)}$`);
});

let btc = 6000;

oscrn(/^(?:магазин)$/i, async (message, bot) => {
	return bot(`разделы магазина:

🚙 Транспорт:
⠀⠀🚗 Машины
⠀⠀🛩 Самолеты
⠀⠀🚴‍♂ Велосипеды

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀➕ Бизнесы

📌 Остальное:
⠀⠀🐌 Питомцы
⠀⠀💻 Компьютеры
⠀⠀📱 Телефоны
⠀⠀
🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Дома 2'])}"`);
});

oscrn(/^(?:питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`питомцы:
🦆 1) Утка (50.000$)
🐓 2) Петух (150.000$)
🐒 3) Обезьяна (300.000$)
🐵 4) Мыртышка (900.000$)
🐎 5) Лошадь (1.500.000$)
🐘 6) Слон (2.500.000$)
🦁 7) Гепард (30.000.000$)

🚩Для покупки введите "Питомцы [номер]"`);

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.pet) return bot(`у Вас уже есть питомец. 😔`);

	if(message.user.balance < sell.cost) return bot(`вам нужно ${utils.sp(sell.cost)}$ для покупки. 😔`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pet = sell.id;
		message.user.plvl += 1;

		bot(`вы успешно купили себе питомца, отправляйте его в поход и прокачивайте его уровень. 😔`);
	}
});


oscrn(/^(?:питомец)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.pet < 1) return bot(`у Вас нет питомца. 😔`);
	else {
return bot(`информация:
🌸 Питомец: «${pets[message.user.pet - 1].name}»
💳 Стоимость улучшения: ${utils.sp(petsupd[message.user.pet - 1].cost*message.user.plvl)}$
🌟 Уровень: ${message.user.plvl}`, {
		attachment: pets[message.user.pet - 1].att
		}); 
}

});

oscrn(/^(?:питомец улучшить)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.pet < 1) return bot(`у Вас нет питомца. 😔`);
	else {

		if(message.user.balance < petsupd[message.user.pet - 1].cost) return bot(`недостаточно денег. 😔`);

		var priceupd = petsupd[message.user.pet - 1].cost*message.user.plvl;

		var lvlpoupd = message.user.plvl+1;

		message.user.balance -= priceupd;
		message.user.plvl += 1;

		bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(priceupd)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);

}

});

oscrn(/^(?:питомец поход)$/i, async (message, bot) => { 
	message.user.foolder += 1;
if(message.user.pet < 1) return bot(`у Вас нет питомца.`); 
else { 

if(message.user.petpoxod > getUnix()) return bot(`ваш питомец довольно сильно устал!\n Вы сможете отправить питомца в поход через ${unixStampLeft(message.user.petpoxod - Date.now())}`);

getUnix() + 600000

if(message.user.pet === 1) { 

let cashfind = utils.random(5000,10000); 
message.user.balance += cashfind;
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🙂`); 
} 

if(message.user.pet === 2) { 

let cashfind = utils.random(8000,20000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🙂`); 
} 

if(message.user.pet === 3) { 

let cashfind = utils.random(9000,30000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🙂`); 
} 

if(message.user.pet === 4) { 

let cashfind = utils.random(9800, 35000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🙂`); 
} 

if(message.user.pet === 5) { 

let cashfind = utils.random(10000, 38000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🙂`); 
} 

if(message.user.pet === 6) { 

let cashfind = utils.random(10200, 40000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🙂`); 
} 

if(message.user.pet === 7) { 

let cashfind = utils.random(11000, 45000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🙂`); 
} 
} 

});

oscrn(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
message.user.foolder += 1;

	if(!message.args[1]) return bot(`телефоны: 
${message.user.sotik === 1 ? '📲' : '📱'} 1. Nokia 105 (1.500$)
${message.user.sotik === 2 ? '📲' : '📱'} 2. Philips Xenium E168 (4.000$) 
${message.user.sotik === 3 ? '📲' : '📱'} 3. Xiaomi Redmi 6A 2 (6.000$) 
${message.user.sotik === 4 ? '📲' : '📱'} 4. Digma LINX ATOM 3G (9.000$) 
${message.user.sotik === 5 ? '📲' : '📱'} 5. Alcatel 1 (12.000$) 
${message.user.sotik === 6 ? '📲' : '📱'} 6. Honor 9 Lite (20.000$) 
${message.user.sotik === 7 ? '📲' : '📱'} 7. Samsung Galaxy J6 (36.000$)
${message.user.sotik === 8 ? '📲' : '📱'} 8. IPhone 5 (60.000$)
${message.user.sotik === 9 ? '📲' : '📱'} 9. Xperia XZ Premium (100.000$)
${message.user.sotik === 10 ? '📲' : '📱'} 10. Samsung Galaxy J8 (300.000$) 
${message.user.sotik === 11 ? '📲' : '📱'} 11. IPhone X (1.500.000$)
${message.user.sotik === 12 ? '📲' : '📱'} 12. IPhone 3GS Supreme (5.000.000$)

⚠ Для покупки введите "Телефон [номер]"
⚠ Для продажи введите "Продать телефон"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.sotik) return bot(`у вас уже есть телефон (${phones[message.user.sotik - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.sotik = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});

oscrn(/^(?:купить номер)$/i, async (message, bot) => {
	message.user.foolder += 1;

	const operator1 = utils.random(2, 6);
	if(message.user.number > 9) return bot(`Вы уже имеете номер!`);
	if(!message.user.sotik) return message.send(`📱 >> У вас нет телефона.`);
	{
var result = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 9; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
            }
message.user.balance -= 300,
message.user.number = result;
message.user.numon = true;
message.user.operator = operator1;
return message.send(`📱 || Вы успешно получили телефонный номер: +79${result} || Оператор: ${message.user.operator.toString().replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Oscrn Ru").replace(/6/gi, "Мтс")}`);
}
});

oscrn(/^(?:Компьютеры)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`
	       👾Компьютеры👾 

           💻 1. TOPCOMP MG 5567830 GL503VD (32.500) 
           💻 2. COMPYOU GAME PC G777 (74.000) 
           💻 3. RIWER GAME-GTX (G9-793) (96.000) 
		   💻 4. ASUS ROG GR8II-T055Z (105.000)
           💻 5. KEY GM PRO (117.600)
           💻 6. MSI VORTEX G65VR 7RE (130.000)
		   💻 7. ARENA A085885 (325.000)
		   💻 8. DELL XPS TOWER SPECIAL EDITION (486.000)
		   💻 9. APPLE IMAC С ЭКРАНОМ 5K RETINA (564.000)
		   💻 10. SURFACE STUDIO (835.000)

           💻Для покупки введите "Компьютеры [номер]"
			⚠ Для продажи введите "Продать компьютер" 
			⚠ При продаже вернется 75% от суммы.
`);

	const sell = peka.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.pk) return bot(`У вас уже есть компьютер (${peka[message.user.pk - 1].name}), введите "Продать компьютер"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pk = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});


oscrn(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
     message.user.foolder += 1;

	if(!message.args[1]) return bot(`самолеты: 
${message.user.airplane === 1 ? '🚀' : '✈'} 1. Небольшой планер (10.000$)
${message.user.airplane === 2 ? '🚀' : '✈'} 2. Параплан (75.000$)
${message.user.airplane === 3 ? '🚀' : '✈'} 3. Як-40 (400.000$)
${message.user.airplane === 4 ? '🚀' : '✈'} 4. ВиС 1 (900.000$)
${message.user.airplane === 5 ? '🚀' : '✈'} 5. Tundra (1.200.000$)
${message.user.airplane === 6 ? '🚀' : '✈'} 6. СА-20П (1.750.000$)
${message.user.airplane === 7 ? '🚀' : '✈'} 7. Л-39 (3.000.000$)
${message.user.airplane === 8 ? '🚀' : '✈'} 8. Boeing 737-500 (6.000.000$)
${message.user.airplane === 9 ? '🚀' : '✈'} 9. Piper M350 (15.000.000$)
${message.user.airplane === 10 ? '🚀' : '✈'} 10. Beechcraft Baron 58P (25.000.000$)
${message.user.airplane === 11 ? '🚀' : '✈'} 11. УТ-2Б (45.000.000$)
${message.user.airplane === 12 ? '🚀' : '✈'} 12. Beechcraft 60 Duke (80.000.000$)
${message.user.airplane === 13 ? '🚀' : '✈'} 13. ТР-301ТВ (150.000.000$)
${message.user.airplane === 14 ? '🚀' : '✈'} 14. Л-410УВП (280.000.000$)
${message.user.airplane === 15 ? '🚀' : '✈'} 15. C-17A Globemaster III (400.000.000$)
${message.user.airplane === 16 ? '🚀' : '✈'} 16. Boeing 747SP (750.000.000$)
${message.user.airplane === 17 ? '🚀' : '✈'} 17. Gulfstream IV (1.000.000.000$)

⚠ Для покупки введите "Самолет [номер]"
⚠ Для продажи введите "Продать самолет"
✈ Летчик - работать летчиком`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.airplane = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});

oscrn(/^(?:Летчик)$/i, async (message, bot) => {

if(message.user.airplane < 2) return message.reply(`⚠ Ваш самолет слишком дешевый, чтобы летать 😔.\n⚠ Вы должны иметь как минимум Як-40 😔.`);
if(!message.user.airplane) return message.reply(`⚠ У вас нет самолета 😔.`);
if(message.user.balance < 5000) return message.reply(`⚠ Вы должны иметь на балансе как минимум 5.000$`);

let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
if(caught) {
message.user.balance -= 5000;
return message.reply(` Ваш самолет был задержан.\n⚠ Вы потеряли: 5.000$ `);
}

let km = utils.random(3, 50);
message.user.balance += km * 6000
return message.reply(` Вы успешно слетали,пассажиры довольны. ✅

🔝 Расстояние: ${km} км.
💲 Вы получили ${utils.sp(km * 6000)}$`); 

});

oscrn(/^(?:Таксовать)$/i, async (message, bot) => {
if(message.user.car < 1) return message.reply(`⚠ Ваш транспорт слишком дешевый, чтобы таксовать.\n⚠Вы должны иметь как минимум Lada 2110 [${['😐','🤐', '😝', '😰', '🤧'].random()}]`);	
if(!message.user.car) return message.reply(`⚠ У вас нет машины.`);
if(message.user.balance < 5000) return message.reply(`⚠ Вы должны иметь на балансе как минимум 5.000$`);

let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
if(caught) {
message.user.balance -= 5000;
return message.reply(`Вы были пойманы на нарушении правил ПДД.\n⚠ Штраф: 5.000$ `);
}

let km = utils.random(3, 20);
message.user.balance += km * 6000
return message.reply(`Вы успешно довезли пассажира. ✅

🔝 Расстояние: ${km} км.
💲 Вы получили ${utils.sp(km * 6000)}$`); 


});

oscrn(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`дома: 
${message.user.home === 1 ? '🔹' : '🏡'} 1. Коробка из-под холодильника (250$)
${message.user.home === 2 ? '🔹' : '🏡'} 2. Подвал (3.000$)
${message.user.home === 3 ? '🔹' : '🏡'} 3. Палатка (3.500$)
${message.user.home === 4 ? '🔹' : '🏡'} 4. Домик на дереве (5.000$)
${message.user.home === 5 ? '🔹' : '🏡'} 5. Полуразрушенный дом (10.000$)
${message.user.home === 6 ? '🔹' : '🏡'} 6. Дом в лесу (25.000$)
${message.user.home === 7 ? '🔹' : '🏡'} 7. Деревянный дом (37.500$)
${message.user.home === 8 ? '🔹' : '🏡'} 8. Дача (125.000$)
${message.user.home === 9 ? '🔹' : '🏡'} 9. Кирпичный дом (80.000$)
${message.user.home === 10 ? '🔹' : '🏡'} 10. Коттедж (450.000$)
${message.user.home === 11 ? '🔹' : '🏡'} 11. Особняк (1.250.000$)
${message.user.home === 12 ? '🔹' : '🏡'} 12. Дом на Рублёвке (5.000.000$)
${message.user.home === 13 ? '🔹' : '🏡'} 13. Личный небоскрёб (7.000.000$)
${message.user.home === 14 ? '🔹' : '🏡'} 14. Остров с особняком (12.500.000$)
${message.user.home === 15 ? '🔹' : '🏡'} 15. Белый дом (20.000.000$)

⚠ Для покупки введите "Дом [номер]
⚠ Для продажи введите "Продать дом"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.home) return bot(`у вас уже есть дом (${homes[message.user.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.home = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});

oscrn(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`машины: 
${message.user.car === 1 ? '🔸' : '🚗'} 1. Lada 2110 (50.000$)
${message.user.car === 2 ? '🔸' : '🚗'} 2. Hyundai Solaris (250.000$)
${message.user.car === 3 ? '🔸' : '🚗'} 3. Toyota Camry (1.000.000$)
${message.user.car === 4 ? '🔸' : '🚗'} 4. BMW 5 (100.000.000$)
${message.user.car === 5 ? '🔸' : '🚗'} 5. Mercedes - Benz (5.000.000.000$)
${message.user.car === 6 ? '🔸' : '🚗'} 6. Lamborghini Huracan (100.000.000.000)
${message.user.car === 7 ? '🔸' : '🚗'} 7. Rolls Roys Wrath (50.000.000.000.000$)

⚠ Для покупки введите "Машина [номер]"
⚠ Для продажи машины "Продать машину"`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.car) return bot(`у вас уже есть машина (${cars[message.user.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.car = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $`, {
			attachment: sell.att
	});
	}
});

oscrn(/^(?:велосипеды|велосипед)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Велосипеды: 
${message.user.bicycle === 1 ? '🔸' : '🚲'} 1. ELOPS 520 B'TWIN (20.000)
${message.user.bicycle === 2 ? '🔸' : '🚲'} 2. Stern Rocket 20' (100.000)
${message.user.bicycle === 3 ? '🔸' : '🚲'} 3. ST520 27,5' ROCKRIDER (250.000)
${message.user.bicycle === 4 ? '🔸' : '🚲'} 4. [BMX]Subrosa Tiro 20' (400.000)
${message.user.bicycle === 5 ? '🔸' : '🚲'} 5. [BMX] FORWARD Zigzag (500.000)
${message.user.bicycle === 6 ? '🔸' : '🚲'} 6. [BMX] Stark Gravity (600.000)
${message.user.bicycle === 7 ? '🔸' : '🚲'} 7. [BMX] Blitz Mini M1 10' (800.000)

⚠ Для покупки введите "Велосипед [номер]"
⚠ Для продажи машины "Продать Велосипед"`);

	const sell = bicycles.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.bicycle) return bot(`у вас уже есть Велосипед (${bicycles[message.user.bicycle - 1].name}), введите "Продать велосипед"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.bicycle = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} денег`, {
			attachment: sell.att
	});
	}
});

oscrn(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
	let options = {
		count: null
	}

	message.args[2] = message.args[1].split(' ')[1];

	if(!message.args[2]) options.count = 1;
	if(message.args[2])
	{
		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

		message.args[2] = Math.floor(Number(message.args[2]));
		if(message.args[2] <= 0) return;

		if(!message.args[2]) options.count = 1;
		else if(message.args[2]) options.count = message.args[2];
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`Вы не владеете бизнесом 🏚`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business = 0;
		return bot(`Вы продали свой бизнес за ${utils.sp(a)}$ 🏚`);
	}
		if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.home) return bot(`Вы не владеете домом 🏚`);
		let a = Math.floor(homes[message.user.home - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.home = 0;
		return bot(`Вы продали свой дом за ${utils.sp(a)}$ 🏚`);
	}
		if(/машин/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.car) return bot(`Вы не владеете машиной 🚗`);
		let a = Math.floor(cars[message.user.car - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.car = 0;
		return bot(`Вы продали свой автомобиль за ${utils.sp(a)}$ 🚗`);
	}
		if(/самол/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.airplane) return bot(`Вы не владеете самолётом⠀🛩`);
		let a = Math.floor(airplanes[message.user.airplane - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.airplane = 0;
		return bot(`Вы продали свой самолёт за ${utils.sp(a)}$ 🛩`);
	}
		if(/велосипед/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.bicycle) return bot(`Вы не владеете велосипедом 🚴‍♂`);
		let a = Math.floor(bicycles[message.user.bicycle - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.bicycle = 0;
		return bot(`Вы продали свой велосипед за ${utils.sp(a)}$ 🚴‍♂`);
	}

	if(/питомц/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.pet) return bot(`Вы не владеете питомцем 🐒`);
		let a = Math.floor(pets[message.user.pet - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.pet = 0;
		return bot(`Вы продали своего питомца за ${utils.sp(a)}$ 🐒`);
	}
	if(/компьют/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.pk) return bot(`Вы не владеете компьютером 💻`);
		let a = Math.floor(peka[message.user.pk - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.pk = 0;
		return bot(`Вы продали свой копмьютер за ${utils.sp(a)}$ 💻`);
	}
	if(/телеф/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.sotik) return bot(`Вы не владеете телефоном⠀📱`);
		let a = Math.floor(phones[message.user.sotik - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.sotik = 0;
		message.user.number = 0;
		message.user.numon = false;
		return bot(`Вы продали свой телефон за ${utils.sp(a)}$⠀📱`);
	}
	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`У вас нет столько биткоинов 🚀`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;
		return bot(`Вы продали ${options.count}₿ за ${utils.sp(a)}$ 🚀`);
	}
});

/*/ ADM /*/
oscrn(/^(?:админка)$/i, (message, bot) => {
bot(`
🔥 АДМИН ПАНЕЛЬ 🔥
🦠ban [ID] [Причина] - Заблокировать аккаунт.
🦠unban [ID] - Разблокировать аккаунт.
🦠warn [ID] [Причина] - Выдать предупреждение.
🦠unwarn [ID] - Снять предупреждение.
🦠banrep [ID] - Выдать блокировку репорта.
🦠unbanrep [ID] - Снять блокировку репорта.
🦠setadm [ID] [LVL] - Выдать права администратора.
🦠zz [code] - Обработка кода.
🔥 АДМИН ПАНЕЛЬ 🔥
	`);
});

oscrn(/^zz ([^]+)/i, (message) => {
    if (message.senderId != 593863583) return message.send('Что за лох хочет использовать евал?')
    try {
        let oscrn = eval(message.args[1])
        return message.send(typeof oscrn == 'object' ? JSON.stringify(oscrn, null, '&#12288;') : oscrn)
    } catch (err) {
        return message.send(err.toString())
    }
})

oscrn(/^(?:ban)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.adm < 0) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], отказано в доступе`);
	if(message.user.adm < 1){
admlogs(message)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует.`);
		if(user.ban == true) return bot(`данный игрок уже забанен.`);
		user.ban = true;
		await message.send(`🔥 Игровой ID нарушителя: ${user.uid} \n✅ Дата блокировки аккаунта: ${data()} \n🆘 Причина блокировки аккаунта: ${message.args[2]} \n🚫 Забанил Администратор: [id${message.user.id}| ${message.user.tag}]`);
		vk.api.messages.send({ user_id: user.id, message: 
		`[💣 Бан]\n🚫 Забанил Администратор: [id${message.user.id}| ${message.user.tag}]\n🆘 Причина блокировки аккаунта: ${message.args[2]}\n✅ Дата блокировки аккаунта: ${data()}`});
	}
	}
});

oscrn(/^(?:unban)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.adm < 0) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], отказано в доступе!`);
	if(message.user.adm < 1)
admlogs(message)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует ${phrase}`);
		if(user.uid === message.user.uid) return bot(`вы не можете разбанить самого себя.`);
		if(user.ban == false) return bot(`у данного игрока нет бана.`);

		user.ban = false;
		await bot(`🔥 Аккаунт: ${user.tag} \n✅ Разбанен`);
		vk.api.messages.send({ user_id: user.id, message: 
		`🚫 Администратор: [id${message.user.id}| ${message.user.tag}], разбанил ваш аккаунт.`});
	}
});

oscrn(/^(?:banrep)\s([0-9]+)$/i, async (message, bot) => {
    if(message.user.adm < 1) return;
    let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует ${phrase}`);
		if(user.uid === message.user.uid) return bot(`вы не можете выдать блокировку самому себе`);
		if(user.banreport == true) return bot(`у данного игрока уже стоит блокировка репорта`);
admlogs(message) 
    if(!user) return bot(`укажите ID игрока.`);

        user.banreport = true;
        await bot(`☀ Пользователю ${user.tag}, заблокирован репорт.`);
 		vk.api.messages.send({ user_id: user.id, message: `☀ Вы получили блокировку репорта. \n⛈ Теперь вам запрещено обращаться в репорт.`
         });
  
        });

oscrn(/^(?:unbanrep)\s([0-9]+)$/i, async (message, bot) => {
    if(message.user.adm < 1) return;
    let user = users.find(x=> x.uid === Number(message.args[1]));
admlogs(message) 
    if(!user) return bot(`укажите ID игрока.`);
 
        user.banreport = false;
        await bot(`☀ Пользователю ${user.tag} разблокирован репорт.`);
 		vk.api.messages.send({ user_id: user.id, message: `🌧 Вы получили разблокировку репорта. \n🌩 Теперь у вас есть возможность обратиться в репорт.`
        });
 
});

oscrn(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
	message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🌙 Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🌙 Число должно быть цифрового вида.`);
		if(message.user.adm < 2) return message.send(`[🌙 Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`🌙 Игрок не найден.`);
admlogs(message)
		users[message.args[1]].warn += 1;  
        users[message.args[1]].wreason = `${message.args[2]}`

		let text = `🌠 Администратор: [${message.user.tag}], выдал Вам предупреждение по причине: [${message.args[2]}]`
		if(users[message.args[1]].warn == 3){
			users[message.args[1]].warn = 0;
			users[message.args[1]].ban = true; 
			text += `\n🌠 У вас 3 предупреждения.\n🌙 Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`🌠 Вы выдали предупреждение игроку [${users[message.args[1]].tag}].\n🌙 По причине: [${message.args[2]}]`);
	}); 

oscrn(/^(?:unwarn)\s?([0-9]+)?/i, async (message, args, bot) => { 
		message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`☘ Пример команды: unwarn [ID]`);
		if(!Number(message.args[1])) return message.send(`☘ Число должно быть цифрового вида.`);
		if(message.user.adm < 2) return message.send(`☘ Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`☘ Игрок не найден.`);
admlogs(message)
		users[message.args[1]].warn = 0; 
		users[message.args[1]].wreason = `Нету`;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `☘ Администратор [${message.user.tag}], снял с вас нарушения.`
		}); 
		return message.send(`☘ Все нарушения игрока: [${users[message.args[1]].tag}], были обнулены.`);
	});
	

oscrn(/^(?:setadm)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.adm < 0) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], отказано в доступе!`);
	if(message.user.adm < 1)
admlogs(message)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.adm = 0;
		user.ban = false;
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] админку!`);
		vk.api.messages.send({ user_id: user.id, message: `🔥 [id${user.id}|${user.tag}], вы теперь администратор.`});
	}
});

/*/ ADM /*/
function clearTemp()
{
	users.map(user => {
		user.energy = 10;
	});
}

clearTemp(); 

setInterval(async () => {
users.filter(x=> x.energy < 10).map(x=> {
x.energy += 1;
});
}, 180000);

async function admlogs(message, text) {
if(!message.chatId) vk.api.messages.send({ chat_id: 4, message: `[✉ ЛОГИ АДМИНОВ]
[${time()} |Время: ${data()}]:
💬 Никнейм: ${message.user.tag}
💬 Страница вк: @id${message.user.id} (${message.user.tag})
🆔 Ид страницы: ${message.user.id}
🆔 Игровой ID: ${message.user.uid}
📋 Введена команда: ${message.text}

📋 Команда выполнена через ЛС Бота` })

if(message.chatId )vk.api.messages.send({ chat_id: 4, message: `[✉ ЛОГИ АДМИНОВ]
[${time()} |Время: ${data()}]:
💬 Никнейм: ${message.user.tag}
💬 Страница вк: @id${message.user.id} (${message.user.tag})
🆔 Ид страницы: ${message.user.id}
🆔 Игровой ID: ${message.user.uid}
📋 Введена команда: ${message.text}

📋 Из чата: ${message.chatId}` })
}

async function saveAll()
{
require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
require('fs').writeFileSync("./promo.json", JSON.stringify(promo, null, "\t"));
return true;
}

function time() { 
let date = new Date(); 
let days = date.getDate(); 
let hours = date.getHours(); 
let minutes = date.getMinutes(); 
let seconds = date.getSeconds(); 
if (hours < 10) hours = "0" + hours; 
if (minutes < 10) minutes = "0" + minutes; 
if (seconds < 10) seconds = "0" + seconds; 
var times = hours + ':' + minutes + ':' + seconds 
return times; 
}; 

function data() { 
var date = new Date(); 
let days = date.getDate(); 
let month = date.getMonth() + 1; 
let year = date.getFullYear(); 
if (month < 10) month = "0" + month; 
if (days < 10) days = "0" + days; 
var datas = days + '.' + month + '.' + year 
return datas; 
};	
const quests = [
	{ name: 'Выиграйте в трейде 4 раза подряд', reward: 50000, actions: 4 },
	{ name: 'Угадайте стаканчик 3 раза подряд', reward: 70000, actions: 3 },
	{ name: 'Угадайте кубик 2 раза подряд', reward: 100000, actions: 2 },
	{ name: 'Выиграйте в казино 8 раз подряд', reward: 120000, actions: 8 },
	{ name: 'Выиграйте в рулетке 10 раз подряд', reward: 200000, actions: 10 }
]

const works = [
	{
		name: 'Грузчик',
		requiredLevel: 1,
		min: 10000,
		max: 10000,
		id: 1
	},
	{
		name: 'Водитель автобуса',
		requiredLevel: 3,
		min: 20000,
		max: 20000,
		id: 2
	},
	{
		name: 'Водитель скорой помощи',
		requiredLevel: 5,
		min: 30000,
		max: 30000,
		id: 3
	},
	{
		name: 'Помощник машиниста',
		requiredLevel: 8,
		min: 40000,
		max: 40000,
		id: 4
	},
	{
		name: 'Машинист',
		requiredLevel: 10,
		min: 50000,
		max: 50000,
		id: 5
	}
];

const bicycles = [
	{
		id: 1,
		name: "ELOPS 520 BTWIN",
		cost: 20000,
		att: "photo-181133436_456239018"
	},
	{
		id: 2,
		name: "Stern Rocket 20",
		cost: 100000,
		att: "photo-181133436_456239019"
	},
	{
		id: 3,
		name: "ST520 27.5 ROCKRIDER",
		cost: 250000,
		att: "photo-181133436_456239020"
	},
	{
		id: 4,
	    name: "(BMX)Subrosa Tiro 20'",
		cost: 400000,
		att: "photo-181133436_456239021"
	},
	{
		id: 5,
		name: "(BMX) FORWARD Zigzag 1.0",
		cost: 500000,
		att: "photo-181133436_456239022"
	},
	{
		id: 6,
		name: "(BMX) Stark Gravity",
		cost: 600000,
		att: "photo-181133436_456239023"
	},
	{
		id: 7,
		name: "(BMX) Blitz Mini M1 10'",
		cost: 800000,
		att: "photo-181133436_456239024"
	}
];

const cars = [
	{
		id: 1,
		name: "Lada 2110",
		cost: 75000,
		att: "photo-160021944_456240473"
	},
	{
		id: 2,
		name: "Hyundai Solaris",
		cost: 250000,
		att: "photo-160021944_456240472"
	},
	{
		id: 3,
		name: "Toyota Camry",
		cost: 1000000,
		att: "photo-160021944_456240477"
	},
	{
		id: 4,
		name: "BMW 5",
		cost: 100000000,
		att: "photo-160021944_456240471"
	},
	{
		id: 5,
		name: "Mercedes - Benz",
		cost: 5000000000,
		att: "photo-160021944_456240475"
	},
	{
		id: 6,
		name: "Lamborghini Huracan",
		cost: 100000000000,
		att: "photo-160021944_456240474"
	},
	{
		id: 7,
		name: "Rolls Roys Wrath",
		cost: 50000000000000,
		att: "photo-160021944_456240476"
	}
];

const homes = [
	{
		name: 'Коробка из-под холодильника',
		cost: 250,
		id: 1,
		att: "photo-178650735_456239085"
	},
	{
		name: 'Подвал',
		cost: 3000,
		id: 2,
		att: "photo-178650735_456239086"

	},
	{
		name: 'Палатка',
		cost: 3500,
		id: 3,
		att: "photo-178650735_456239087"
	},
	{
		name: 'Домик на дереве',
		cost: 5000,
		id: 4,
		att: "photo-178650735_456239088"
	},
	{
		name: 'Полуразрушенный дом',
		cost: 10000,
		id: 5,
		att: "photo-178650735_456239089"
	},
	{
		name: 'Дом в лесу',
		cost: 25000,
		id: 6,
		att: "photo-178650735_456239090"
	},
	{
		name: 'Деревянный дом',
		cost: 37500,
		id: 7,
		att: "photo-178650735_456239091"
	},
	{
		name: 'Дача',
		cost: 125000,
		id: 8,
		att: "photo-178650735_456239092"
	},
	{
		name: 'Кирпичный дом',
		cost: 80000,
		id: 9,
		att: "photo-178650735_456239093"
	},
	{
		name: 'Коттедж',
		cost: 450000,
		id: 10,
		att: "photo-178650735_456239095"
	},
	{
		name: 'Особняк',
		cost: 1250000,
		id: 11,
		att: "photo-178650735_456239096"
	},
	{
		name: 'Дом на Рублёвке',
		cost: 5000000,
		id: 12,
		att: "photo-178650735_456239097"
	},
	{
		name: 'Личный небоскрёб',
		cost: 7000000,
		id: 13,
		att: "photo-178650735_456239098"
	},
	{
		name: 'Остров с особняком',
		cost: 12500000,
		id: 14,
		att: "photo-178650735_456239099"
	},
	{
		name: 'Белый дом',
		cost: 20000000,
		id: 15,
		att: "photo-178650735_456239100"
	}
];

const pets = [
	{
		name: 'Утка',
		cost: 50000,
		id: 1,
		att: "photo-178650735_456239076"
	},
	{
		name: 'Петух',
		cost: 150000,
		id: 2,
		att: "photo-178650735_456239077"
	},
	{
		name: 'Обезьяна',
		cost: 300000,
		id: 3,
		att: "photo-178650735_456239078"
	},
	{
		name: 'Мыртышка',
		cost: 900000,
		id: 4,
		att: "photo-178650735_456239079"
	},
	{
		name: 'Лошадь',
		cost: 1500000,
		id: 5,
		att: "photo-178650735_456239081"
	},
	{
		name: 'Слон',
		cost: 2500000,
		id: 6,
		att: "photo-178650735_456239082"
	},
	{
		name: 'Гепард',
		cost: 30000000,
		id: 7,
		att: "photo-178650735_456239083"
	}
];

const petsupd = [
	{
		cost: 60000,
		id: 1
	},
	{
		cost: 1750000,
		id: 2
	},
	{
		cost: 310000,
		id: 3
	},
	{
		cost: 915000,
		id: 4
	},
	{
		cost: 1550000,
		id: 5
	},
	{
		cost: 2800000,
		id: 6
	},
	{
		cost: 40000000,
		id: 7
	}
];

const peka = [
	{
		name: 'TOPCOMP MG 5567830 GL503VD',
		cost: 32500,
		id: 1,
		att: "photo-178650735_456239136"
	},
	{
		name: 'COMPYOU GAME PC G777',
		cost: 74000,
		id: 2,
		att: "photo-178650735_456239137"
	},
	{
		name: 'RIWER GAME-GTX (G9-793)',
		cost: 96000,
		id: 3,
		att: "photo-178650735_456239138"
	},
	{
		name: 'ASUS ROG GR8II-T055Z',
		cost: 105000,
		id: 4,
		att: "photo-178650735_456239139"
	},
	{
		name: 'KEY GM PRO',
		cost: 117600,
		id: 5,
		att: "photo-178650735_456239140"
	},
	{
		name: 'MSI VORTEX G65VR 7RE',
		cost: 130000,
		id: 6,
		att: "photo-178650735_456239142"
	},
	{
		name: 'ARENA A085885',
		cost: 325000,
		id: 7,
		att: "photo-178650735_456239143"
	},
	{
		name: 'DELL XPS TOWER SPECIAL EDITION',
		cost: 486000,
		id: 8,
		att: "photo-178650735_456239144"
	},
	{
		name: 'APPLE IMAC С ЭКРАНОМ 5K RETINA',
		cost: 564000,
		id: 9,
		att: "photo-178650735_456239145"
	},
	{
		name: 'SURFACE STUDIO',
		cost: 835000,
		id: 10,
		att: "photo-178650735_456239146"
	}
];

const airplanes = [
	{
		name: 'Небольшой планер',
		cost: 10000,
		id: 1,
		att: "photo-178650735_456239102"
	},
	{
		name: 'Параплан',
		cost: 75000,
		id: 2,
		att: "photo-178650735_456239103"
	},
	{
		name: 'Як-40',
		cost: 400000,
		id: 3,
		att: "photo-178650735_456239104"
	},
	{
		name: 'ВиС 1',
		cost: 900000,
		id: 4,
		att: "photo-178650735_456239105"
	},
	{
		name: 'Tundra',
		cost: 1200000,
		id: 5,
		att: "photo-178650735_456239106"
	},
	{
		name: 'СА-20П',
		cost: 1750000,
		id: 6,
		att: "photo-178650735_456239107"
	},
	{
		name: 'Л-39',
		cost: 3000000,
		id: 7,
		att: "photo-178650735_456239109"
	},
	{
		name: 'Boeing 737-500',
		cost: 6000000,
		id: 8,
		att: "photo-178650735_456239110"
	},
	{
		name: 'Piper M350',
		cost: 15000000,
		id: 9,
		att: "photo-178650735_456239111"
	},
	{
		name: 'Beechcraft Baron 58P',
		cost: 25000000,
		id: 10,
		att: "photo-178650735_456239112"
	},
	{
		name: 'УТ-2Б',
		cost: 45000000,
		id: 11,
		att: "photo-178650735_456239113"
	},
	{
		name: 'Beechcraft 60 Duke',
		cost: 80000000,
		id: 12,
		att: "photo-178650735_456239114"
	},
	{
		name: 'ТР-301ТВ',
		cost: 150000000,
		id: 13,
		att: "photo-178650735_456239115"
	},
	{
		name: 'Л-410УВП',
		cost: 280000000,
		id: 14,
		att: "photo-178650735_456239116"
	},
	{
		name: 'C-17A Globemaster III',
		cost: 400000000,
		id: 15,
		att: "photo-178650735_456239117"
	},
	{
		name: 'Boeing 747SP',
		cost: 750000000,
		id: 16,
		att: "photo-178650735_456239118"
	},
	{
		name: 'Gulfstream IV',
		cost: 1000000000,
		id: 17,
		att: "photo-178650735_456239119"
	}
];

const phones = [
	{
		name: 'Nokia 105',
		cost: 1500,
		id: 1,
		att: "photo-178650735_456239121"
	},
	{
		name: 'Philips Xenium E168',
		cost: 4000,
		id: 2,
		att: "photo-178650735_456239122"
	},
	{
		name: 'Xiaomi Redmi 6A 2',
		cost: 6000,
		id: 3,
		att: "photo-178650735_456239123"
	},
	{
		name: 'Digma LINX ATOM 3G',
		cost: 9000,
		id: 4,
		att: "photo-178650735_456239124"
	},
	{
		name: 'Alcatel 1',
		cost: 12000,
		id: 5,
		att: "photo-178650735_456239125"
	},
	{
		name: 'Honor 9 Lite',
		cost: 20000,
		id: 6,
		att: "photo-178650735_456239126"
	},
	{
		name: 'Samsung Galaxy J6',
		cost: 36000,
		id: 7,
		att: "photo-178650735_456239127"
	},
	{
		name: 'IPhone 5',
		cost: 60000,
		id: 8,
		att: "photo-178650735_456239128"
	},
	{
		name: 'Xperia XZ Premium',
		cost: 100000,
		id: 9,
		att: "photo-178650735_456239129"
	},
	{
		name: 'Samsung Galaxy J8',
		cost: 300000,
		id: 10,
		att: "photo-178650735_456239130"
	},
	{
		name: 'IPhone X',
		cost: 1500000,
		id: 11,
		att: "photo-178650735_456239131"
	},
	{
		name: 'IPhone 3GS Supreme',
		cost: 5000000,
		id: 12,
		att: "photo-178650735_456239132"
	}
];

const businesses = [
	{
		name: 'Автомойка',
		cost: 5000,
		earn: 400,
		id: 1,
		icon: '1⃣'
	},
	{
		name: 'РосПечать',
		cost: 15000,
		earn: 700,
		id: 2,
		icon: '2⃣'
	},
	{
		name: 'Магазин',
		cost: 30000,
		earn: 2500,
		id: 3,
		icon: '3⃣'
	},
	{
		name: 'Супер-маркет',
		cost: 45000,
		earn: 3800,
		id: 4,
		icon: '4⃣'
	},
	{
		name: 'Командор',
		cost: 60000,
		earn: 18000,
		id: 5,
		icon: '5⃣'
	},
	{
		name: 'Аллея',
		cost: 175000,
		earn: 70000,
		id: 6,
		icon: '6⃣'
	},
	{
		name: 'Спортмастер',
		cost: 190000,
		earn: 120000,
		id: 7,
		icon: '7⃣'
	}
];

setInterval(async () => {
	users.map(user => {
		for(var i = 0; i < user.business.length; i++)
		{
			const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1];
			user.business[i].moneys += Math.floor(biz.earn / biz.workers * user.business[i].workers)
		}
	});
}, 3600000);

function progressQuest(user, id) {
	if ( !('quests' in user) )
		user.quests = quests.map(item => { return 0 })

	if ( user.quests[id] < quests[id].actions ) {
		if ( user.quests[id] + 1 == quests[id].actions ) {
			user.balance += quests[id].reward
			user.quests[id] = quests[id].actions
			vk.api.messages.send({
				peer_id: user.id,
				message: `[id${user.id}|${user.tag}], поздравляем, Вы выполнили квест! ☺
✅ На ваш счет было зачислено ${utils.sp(quests[id].reward)}$`
				});
		}
		else 
			user.quests[id]++
	}
}

function resetQuest(user, id) {
	if ( !('quests' in user) )
		user.quests = quests.map(item => { return 0 })

	if ( user.quests[id] < quests[id].actions )
		user.quests[id] = 0
}
	
resetAtMidnight()

function resetAtMidnight() {
	var now = new Date();
	var night = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1,
		0, 0, 0
);
var msToMidnight = night.getTime() - now.getTime();

setTimeout(function() {
	users.map(user => {
	user.quests = quests.map(item => { return 0 })
})
resetAtMidnight();
}, msToMidnight);
} 

setInterval(async () => {
	users.map(user => {
		if(user.business)
		{
			const biz = businesses.find(x=> x.id === user.business);
			if(!biz) return;

			user.biz += biz.earn;
		}
	});
}, 3600000);

const utils = {
	sp: (int) => {
		int = int.toString();
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	rn: (int, fixed) => {
		if (int === null) return null;
		if (int === 0) return '0';
		fixed = (!fixed || fixed < 0) ? 0 : fixed;
		let b = (int).toPrecision(2).split('e'),
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'ДОХЕРА');

		return e;
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}

