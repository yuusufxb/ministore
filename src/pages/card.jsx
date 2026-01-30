export function Card({cart}) {
  return (
    <div>
        {cart.map( (ca,index)=>(
            <div>
            <p>{ca.title}</p>
            <p>{ca.price}</p>
            </div>
        )
        )}
    </div>
  );
}
