import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";

export default function Statistics() {
  const data = [
    { name: "Shopping", value: 12, color: "#FFC107" },
    { name: "Other Activities", value: 156, color: "#03A9F4" },
  ];

  return (
    <Card
      className="w-full"
      style={{
        backgroundColor: "#254D32",
        color: "#FFFFFF",
        borderRadius: "0",
        border: "none",
      }}
    >
      <CardHeader className="p-6 md:p-8 lg:p-10">
        <CardTitle className="text-2xl mt-8 lg:text-5xl font-bold text-center">
          Время, Потраченное на Шоппинг
        </CardTitle>
        <CardDescription className="text-lg font-regular text-gray-300 lg:text-lg text-center">
          Узнайте, как оптимизировать ваши привычки покупок и вернуть свое
          время.
        </CardDescription>
      </CardHeader>
      <div className="flex">
        <CardContent className="p-8 md:p-10 lg:px-12 pb-12 grid gap-12">
          <div className="grid md:grid-cols-1 gap-8">
            <div className="grid gap-6">
              <div className="bg-opacity-50 bg-black rounded-lg p-6 flex flex-col justify-center items-center">
                <h4 className="text-lg lg:text-xl font-medium">
                  Вы тратите в среднем:
                </h4>
                <p className="text-5xl lg:text-6xl font-bold">12 часов</p>
                <p className="text-opacity-75 text-white">
                  в неделю на шоппинг
                </p>
              </div>
              <div className="bg-opacity-50 bg-black rounded-lg p-6 flex flex-col justify-center items-center">
                <h4 className="text-lg lg:text-xl font-medium">
                  Это эквивалентно:
                </h4>
                <p className="text-5xl lg:text-6xl font-bold">1.5 дня</p>
                <p className="text-opacity-75 text-white">в месяц</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl mb-10 mt-6 lg:text-4xl font-bold text-center">
              Рекомендации
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-opacity-50 bg-black rounded-lg p-6 grid gap-6">
                <div>
                  <h4 className="text-lg lg:text-xl font-medium">
                    Планируйте Шоппинг
                  </h4>
                  <p className="text-opacity-75 text-white">
                    Планируйте свои походы по магазинам заранее и объединяйте
                    похожие поручения, чтобы сэкономить время.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-medium">
                    Покупки Онлайн
                  </h4>
                  <p className="text-opacity-75 text-white">
                    Рассмотрите возможность покупки товаров онлайн, чтобы
                    сократить время, проведенное в магазинах.
                  </p>
                </div>
              </div>
              <div className="bg-opacity-50 bg-black rounded-lg p-6 grid gap-10">
                <div>
                  <h4 className="text-lg lg:text-xl font-medium">
                    Откройте Новые Увлечения
                  </h4>
                  <p className="text-opacity-75 text-white">
                    Инвестируйте свое время в более продуктивные и
                    удовлетворяющие занятия, которые соответствуют вашим
                    интересам.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-medium">
                    Практикуйте Осознанность
                  </h4>
                  <p className="text-opacity-75 text-white">
                    Развивайте более целенаправленный подход к покупкам и будьте
                    в настоящем моменте.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-medium">
                    Проводите Время с Семьей
                  </h4>
                  <p className="text-opacity-75 text-white">
                    Используйте время, сэкономленное на шоппинге, чтобы провести
                    его с близкими.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-medium">
                    Занимайтесь Спортом
                  </h4>
                  <p className="text-opacity-75 text-white">
                    Потратьте освободившееся время на физические упражнения и
                    улучшение своего здоровья.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function PieChartCustom(props: any) {
  const config = {
    shopping: {
      label: "Shopping",
      color: "#FFC107",
    },
    other: {
      label: "Other Activities",
      color: "#03A9F4",
    },
  };

  return (
    <div {...props}>
      <ChartContainer config={config}>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={props.data}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {props.data.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
