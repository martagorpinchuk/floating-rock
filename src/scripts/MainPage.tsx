import FloatingRock from "./FloatingRock";
// import FogScene from "./Fog";


 class MainPage {

    public dispatch: any;
    public floatingRock: FloatingRock = new FloatingRock();
    // public fog: FogScene = new FogScene();

    //

    public init = () : void => {

        // this.devUI = new Pane();
        this.floatingRock.init();
        // this.fog.init();

        //

        // this.dispatch({ type: APP_INITED });

    };

};

export default new MainPage();