import React from 'react'
import { Link } from 'react-router-dom'

export default function Milestones() {
  const milestones = [
    { year: "1999-2000", text: "Establishment of MNR Medical College & Hospital" },
    { year: "2001-2002", text: "First Undergraduate Program (MBBS) commenced; Central Library inaugurated" },
    { year: "2006-2007", text: "First batch of MBBS students graduated; MCI recognition" },
    { year: "2007-2008", text: "Visit of Dr. A.P.J. Abdul Kalam to Central Library" },
    { year: "2009-2010", text: "First Postgraduate Programs (MD/MS) launched in 10 specialities" },
    { year: "2011-2012", text: "Postgraduate Programs added in Radiology, Microbiology, and Social & Preventive Medicine" },
    { year: "2012-2013", text: "MD in Radiology introduced" },
    { year: "2013-2014", text: "Establishment of Internal Quality Assurance Cell (IQAC)" },
    { year: "2014-2015", text: "Postgraduate Programs in Anatomy, Physiology, Biochemistry and Pharmacology started" },
    { year: "2015-2016", text: "MS in Ophthalmology introduced" },
    { year: "2016-2017", text: "ISO Certification achieved" },
    { year: "2017-2018", text: "NAAC Accreditation with 'A' Grade" },
    { year: "2020-2021", text: "MD in Psychiatry introduced; PG seats expanded; UG seats increased to 150" },
    { year: "2021-2022", text: "Renewal of 150 MBBS seats; NABL Accreditation for Virology Lab" },
    { year: "2022-2023", text: "NABH Accreditation process initiated" }
  ]

  return (
    <div className="milestones-page">
      <div className="section-container">
        <h1 className="page-title">Milestones & <span className="text-red">Activities</span></h1>
        
        <div className="timeline">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">{milestone.year}</span>
                <p>{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/" className="btn btn-primary back-btn">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}