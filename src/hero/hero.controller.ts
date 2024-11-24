import { Controller } from "@nestjs/common";
import {
	Hero,
	HeroById,
	HeroServiceController,
	HeroServiceControllerMethods,
} from "./hero";

@Controller()
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
	findOne(data: HeroById): Hero {
		const items = [
			{ id: 1, name: "John" },
			{ id: 2, name: "Doe" },
		];
		return items.find(({ id }) => id === data.id);
	}
}
