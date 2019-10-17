<?php
Class Home extends CI_Controller{
    public function __construct()
    {
        parent::__construct();
    }


    public function index()
    {
        $this->page = "home";
        $this->load->view('includes/index');
    }

    public function message()
    {
        $name = strip_tags($this->input->post('name'));
        $email = strip_tags($this->input->post('email'));
        $msg = strip_tags($this->input->post('message'));
       
        if (!empty($name) and !empty($email) and !empty($msg)) {

            $config = Array(
                'protocol' => 'smtp',
                'smtp_host' => 'ssl://smtp.googlemail.com',
                'smtp_port' => 465,
                'smtp_user' => 'omrovf@gmail.com',
                'smtp_pass' => '3109852elxan',
                'mailtype' => 'html',
                'charset' => 'html',
                'wordwrap' => TRUE,);

            $this->load->library("email");
            $this->email->initialize($config);
            $this->email->set_newline("\r\n");
            $this->email->from('omrovf@gmail.com', $name);
            $this->email->to("omrovf@gmail.com");
            $this->email->subject(' Maddox  ');
            $this->email->message("From: $name <br> $msg <br> <br> <strong>Contact:</strong> <br>$email");
            $this->email->send();
            $this->session->set_flashdata('suc','Your message have sent succesfully');
            redirect(base_url('contact'));
        }else{
            $this->session->set_flashdata('suc','Fill all!');
            redirect(base_url('contact'));
        }
    }

    public function contact()
    {
        $this->page = "contact";
        $this->page_pre = "Contact";
        $this->load->view("includes/index");
    }


}
