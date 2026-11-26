terraform {
  required_version = ">= 1.16.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 5.0"
    }
  }
}

provider "vercel" {
}



data "vercel_project" "blood_pressure" {
  name = "blood-pressure-react"
}


resource "vercel_project" "blood_pressure" {
  name      = "blood-pressure-react"
  framework = "vite"
    
    git_repository = {
        type = "github"
        repo = "HardeepKaur21/blood-pressure-react"
        production_branch = "main"
    }

  lifecycle {
    prevent_destroy = true

    ignore_changes = [
      auto_assign_custom_domains,
      build_machine_type,
      git_provider_options,
      resource_config,
      serverless_function_region
    ]
  }
}




resource "vercel_project_environment_variable" "deployment_stage" {
  project_id = vercel_project.blood_pressure.id

  key       = "DEPLOYMENT_STAGE"
  value     = "qa"
  target    = ["preview"]
  sensitive = false
}

