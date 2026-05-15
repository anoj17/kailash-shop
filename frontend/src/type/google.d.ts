// Type declarations for Google Identity Services (GIS)
declare namespace google {
  namespace accounts {
    namespace id {
      interface IdConfiguration {
        client_id: string;
        callback: (response: { credential: string; select_by?: string }) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
        context?: "signin" | "signup" | "use";
      }

      interface GsiButtonConfiguration {
        type?: "standard" | "icon";
        theme?: "outline" | "filled_blue" | "filled_black";
        size?: "large" | "medium" | "small";
        text?: "signin_with" | "signup_with" | "continue_with" | "signin";
        shape?: "rectangular" | "pill" | "circle" | "square";
        logo_alignment?: "left" | "center";
        width?: number;
        locale?: string;
      }

      function initialize(config: IdConfiguration): void;
      function renderButton(parent: HTMLElement, config: GsiButtonConfiguration): void;
      function prompt(): void;
      function disableAutoSelect(): void;
    }
  }
}

interface Window {
  google?: typeof google;
}
