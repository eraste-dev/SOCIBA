export type IdebugType = "warn" | "error" | "info" | "success" | "default" | "table";

export interface Idebug {
	message?: string;
	vars?: any;
	type?: IdebugType;
}

export class Debug {
	message?: string;
	vars?: any;
	type?: IdebugType = "default";
	canDebug: boolean = true; // process.env.NODE_ENV === "development"

	Debug({ message, vars = undefined, type = "default" }: { message?: string; vars?: any; type?: IdebugType } = {}) {
		this.message = message;
		this.vars = vars;
		this.type = type;
	}

	debug = () => {
		if (this.canDebug) {
			console.log(this.message);

			switch (this.type) {
				case "default":
					console.log(this.vars);
					break;

				case "error":
					console.error(this.vars);
					break;

				case "table":
					console.table(this.vars);
					break;
                    
				default:
					console.log(this.vars);
					break;
			}
		}
	};
}
