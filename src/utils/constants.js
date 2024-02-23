export const AboutVitaliy = 'Я родился и живу в Саратове, закончил факультет экономики СГУ.У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.'
export const AboutMeInfo = 'В 2012 году я закончила экономический факультет МосАП по специализации "Мировая экономика". У меня есть самая ленивая не свете кошка, по имени Дуся. Я очень люблю путешествовать и читать книги. С 2010 года я начала работать в строительной сфере менеджером бэк-офиса, в настоящий момент занимаю должность руководителя отдела. Мой интерес к веб-разработке возник достаточно давно, но решиться на кардинальную смену деятельности было нелегко. Сейчас я заканчиваю свое обучение и очень надеюсь, что в ближайщем будущем стану частью команды разработчиков в интересном проекте.';
export const RegExEmail = '^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim';
export const BreakpointXL = 1161;
export const BreakpointL = 1001;
export const BreakpointM = 631;
export const BreakpointS = 320;
export const DuplicateError = 'Пользователь с таким email уже существует';
export const RegisterError = 'При регистрации пользователя произошла ошибка';
export const ServerError = 'Ha сервере произошла ошибка';
export const LoginError = 'Вы ввели неправильный логин или пароль';
export const ProfileError = 'При обновлении профиля произошла ошибка';
export const LoadingFilmError = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const LoadingProfileSuccess = 'Профиль успешно обновлен';
export const NumberMoviesForXL = 16;
export const NumberMoviesForL = 12;
export const NumberMoviesForM = 8;
export const NumberMoviesForS = 5;
export const AddNumberMoviesForXL = 4;
export const AddNumberMoviesForL = 3;
export const AddNumberMoviesForM = 2;
export const AddNumberMoviesForS = 2;
export const MovieDuration = (movie) => [`${Math.floor(movie.duration / 60)}ч ${(movie.duration % 60)}м`];

