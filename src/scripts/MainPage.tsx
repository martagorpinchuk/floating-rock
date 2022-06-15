import FloatingRock from "./FloatingRock";


 class MainPage {

    public dispatch: any;
    public floatingRock: FloatingRock = new FloatingRock();

    //

    public init = () : void => {

        // this.devUI = new Pane();
        this.floatingRock.init();

        //

        // this.dispatch({ type: APP_INITED });

    };

};

export default new MainPage();