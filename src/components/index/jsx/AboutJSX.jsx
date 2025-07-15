import {Chip} from "@heroui/react";
export default function App(props) {
  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div>
          {props.avatarImg}
        </div>
        <div className="flex flex-col items-center font-Quantico">
          <h2 className="text-4xl font-bold">eitaar</h2>
          <p className="text-default-600">student?</p>
          <Chip className="text-sm" variant="flat" color="primary">Japanese | 16</Chip>
        </div>
      </div>              
    </div>
  );
}
