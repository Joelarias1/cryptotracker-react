const stats = [
  { id: 1, name: "CryptoCurrencies", value: "10,497" },
  { id: 2, name: "Exchanges", value: "900" },
  { id: 3, name: "New Crypto users annually", value: "46,000" },
];

const BigCard = () => {
  return (
    <div style={{ position: 'relative', top: '80px' }}>
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="mx-auto flex max-w-xs flex-col gap-y-4 "
                >
                  <dt className="text-base leading-7 text-gray">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl ">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
};


export default BigCard;
