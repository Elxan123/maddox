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
        $this->page_pre = "Presences";
        $this->page = "about_presences";
        $this->load->view('includes/index');
        
    }

    public function risk_management()
    {
        $this->page_pre = "Risk Management";
        $this->page = "risk_management";
        $this->load->view('includes/index');
        
    }
}

