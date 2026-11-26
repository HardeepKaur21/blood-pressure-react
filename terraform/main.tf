terraform {
  required_version = ">= 1.16.0"

  required_providers {
    vercel = {
      source = "vercel/vercel"
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
  name = "blood-pressure-react"

  lifecycle {
    prevent_destroy = true
    ignore_changes = all
  }
}



resource "vercel_project_environment_variable" "deployment_stage" {
  project_id = vercel_project.blood_pressure.id

  key = "DEPLOYMENT_STAGE"
  value = "qa"
  target = ["preview"]
  sensitive = false
}

