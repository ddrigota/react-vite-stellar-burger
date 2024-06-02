import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { XYCoord } from "dnd-core";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { removeIngredient, reorderConstructor } from "../../services/constructor/constructorSlice";
import { useAppDispatch } from "../../utils/hooks";
import { IngredientType } from "../../utils/types";
import styles from "./ingredient-item.module.css";

interface IngredientItemProps {
  ingredient: IngredientType;
  index: number;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();
  const id = ingredient.id;
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "listitem",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_, drop] = useDrop({
    accept: "listitem",
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(reorderConstructor({ from: dragIndex, to: hoverIndex }));

      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      className={`${styles.сonstructor_item}`}
      ref={ref}
      style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.translatedName || ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient._id))}
      />
    </li>
  );
};

export default IngredientItem;
