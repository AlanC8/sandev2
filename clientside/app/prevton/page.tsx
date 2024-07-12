import Link from "next/link";
import Header from "../components/Header";

export default function Prevton() {
  return (
    <div>
      <Header />
      <div className="w-full max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-6xl">
              Прежде чем начать
            </h1>
            <p className="mt-4 text-sm opacity-[0.9]">
              Эта страница объясняет, как использовать функцию виртуальной
              примерки для повышения вашей производительности. Мы расскажем о
              том, как эффективно использовать эту технологию, чтобы быстро и
              легко подбирать одежду из лучших магазинов Казахстана, экономя
              ваше время и усилия.
            </p>
          </div>
          <div className="grid gap-8">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  1
                </div>
                <h3 className="text-xl font-semibold">
                  Встаньте прямо и сделайте качественное фото
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src="/KakaoTalk_Photo_2024-04-04-21-20-19.png"
                    width={300}
                    height={200}
                    alt="Photography gear"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Какие изображения нежелательны для загрузки
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Размытые или нечёткие фотографии
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Фотографии с посторонними объектами или людьми
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Фотографии, где лицо или тело частично закрыты
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Изображения с неестественными позами
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  2
                </div>
                <h3 className="text-xl font-semibold">
                  Процесс виртуальной примерки
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src="/2024-07-11_01-09-58.png"
                    width={300}
                    height={200}
                    alt="Camera settings"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Как получить лучший результат с виртуальной примерки:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Регистрация и загрузка фотографии
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Верхняя одежда: куртки, пальто, блузы, рубашки и т.д.
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Нижняя одежда: брюки, юбки, шорты и т.д.
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Одежда на всё тело: платья, комбинезоны, костюмы и т.д.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  3
                </div>
                <h3 className="text-xl font-semibold">Выбор магазина</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src="/2024-07-11_01-12-56.png"
                    width={300}
                    height={200}
                    alt="Composition techniques"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Нажмите "Выбрать магазин" для просмотра списка.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Добавьте своё фото в разделе "Ваша фотка".
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      В каждом магазине представлены различные категории одежды.
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Кликните на одежду для примерки.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  4
                </div>
                <h3 className="text-xl font-semibold">
                  Посмотрите раздел "Пример" для большей ясности.
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src="/2024-07-11_01-19-14.png"
                    width={300}
                    height={200}
                    alt="Photo editing software"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Там вы найдёте полезные советы и рекомендации.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Советы по фотографии и виртуальной примерке.
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Рекомендации по выбору одежды и магазина.
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                      Удачи!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-14">
          <Link href={'/vton'}>
          <button className="px-4 py-2 bg-[#254D32] text-white rounded">
            Перейти к примерке
          </button></Link>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
