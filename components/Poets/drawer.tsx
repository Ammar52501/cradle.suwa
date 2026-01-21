import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { LeftArrow } from "@/assets/svgsComponents";
import PoetsSlider from "../PoetsSlider";
import Image from "next/image";
import Link from "next/link";
const DrawerPoets = ({
  isOpen,
  onOpenChange,
  cityData,
  moreAbout,
  isAR,
  poetriesData,
  activePoetId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cityData: {
    icon: string;
    name: string;
    descriptionShort: string;
    id: string | number;
    poetID: string | number;
  };
  moreAbout: string;
  isAR: boolean;
  poetriesData: any;
  activePoetId: string | number;
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[450px] max-h-[85vh] overflow-y-auto relative px-5 pt-4 pb-7">
          <Link href={`/city/${cityData?.id}?poetId=${activePoetId}`}>
            <Image
              className="w-full h-40 rounded-lg"
              src={cityData?.icon}
              alt={cityData?.name}
              width={100}
              height={100}
            />
            <DrawerTitle className="mt-5 mb-2 font-bold text-2xl">
              {cityData?.name}
            </DrawerTitle>
            <DrawerDescription>
              <p className="text-muted-foreground text-base">
                {/* {cityData?.descriptionShort} */}
                {poetriesData?.[0]?.entrance}
              </p>
              <Link
                href={`/city/${cityData?.id}?poetId=${activePoetId}`}
                className="flex items-center space-x-2 mt-2 text-secondary"
              >
                <span className="text-base font-bold">
                  {moreAbout} {cityData?.name}
                </span>
                <LeftArrow
                  className="w-3 h-3 ltr:rotate-180"
                  stroke="currentColor"
                />
              </Link>
            </DrawerDescription>
          </Link>

          {isAR && (
            <PoetsSlider cityId={cityData?.id} poetriesData={poetriesData} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerPoets;
