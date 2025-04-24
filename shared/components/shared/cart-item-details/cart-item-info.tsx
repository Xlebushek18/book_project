interface Props {
  name: string;
  details: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details }) => {
  
  return (
    <div>
      <div className='flex items-center justify-between'>
        {/*Название пицца*/}
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {/*Детали товара*/}
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
