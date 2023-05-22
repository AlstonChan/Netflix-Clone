import stylesSpin from "@/components/common/Loader/loader.module.scss";
import Spinner from "@/public/images/browse/spinner.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

export default function AccountLoader() {
  return (
    <main className={stylesSpin.mainLoader}>
      <div className={stylesSpin.profilePicCenter}>
        <div className={stylesSpin.spinnerContain}>
          <Image src={Spinner} alt="loading spinner" style={responsive} />
        </div>
      </div>
    </main>
  );
}
