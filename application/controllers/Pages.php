<?php

Class Pages extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
    }




    public function about_history()
{
    $this->page = "about_history";
    $this->page_pre = "About History";
    $this->load->view('includes/index');
}

    public function about_presences()
    {
        $this->page_pre = " About Presences";
        $this->page = "about_presences";
        $this->load->view('includes/index');
        
    }

    public function risk_management()
    {
        $this->page_pre = "Risk Management";
        $this->page = "risk_management";
        $this->load->view('includes/index');
        
    }

    public function activity_activities()
    {
    $this->page_pre = "Our Activities";
    $this->page = "activity_activities";
    $this->load->view('includes/index');

    }
    public function activity_bunkering()
    {
        $this->page_pre = "Bunkering Business";
        $this->page = "activity_bunkering";
        $this->load->view('includes/index');

    }
    public function activity_crude()
    {
        $this->page_pre = "Crude Oil";
        $this->page = "activity_crude";
        $this->load->view('includes/index');

    }
    public function activity_domestic()
    {
        $this->page_pre = "Domestic Downstream Operations";
        $this->page = "activity_domestic";
        $this->load->view('includes/index');

    }
    public function activity_markets()
    {
        $this->page_pre = "Supply of End-Consumer Markets";
        $this->page = "activity_markets";
        $this->load->view('includes/index');

    }
    public function activity_refined()
    {
        $this->page_pre = "Refined Petroleum Products";
        $this->page = "activity_refined";
        $this->load->view('includes/index');

    }
    public function activity_trading()
    {
        $this->page_pre = "Trading";
        $this->page = "activity_trading";
        $this->load->view('includes/index');

    }
    public function value_compliance()
    {
        $this->page_pre = "Compliance";
        $this->page = "value_compliance";
        $this->load->view('includes/index');

    }
    public function value_governance()
    {
        $this->page_pre = "Governance";
        $this->page = "value_governance";
        $this->load->view('includes/index');

    }
    public function value_social()
    {
        $this->page_pre = "Social Responsiblity";
        $this->page = "value_social";
        $this->load->view('includes/index');

    }



}

