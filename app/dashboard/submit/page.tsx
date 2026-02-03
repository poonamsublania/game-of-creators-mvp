'use client'

import { useEffect, useState } from 'react'

type Submission = {
  id: string
  post_url: string
  submitted_at: string
}

const CAMPAIGN_ID = '4f111ee6-23cf-489e-aed0-008cad241517'

export default function SubmitPage() {
  const [postUrl, setPostUrl] = useState('')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)

  /* ================= FETCH SUBMISSIONS ================= */
  useEffect(() => {
    const loadSubmissions = async () => {
      const res = await fetch('/api/submissions')
      const data = await res.json()

      if (Array.isArray(data)) {
        setSubmissions(data)
      }
    }

    loadSubmissions()
  }, [])

  /* ================= SUBMIT ================= */
  const submitContent = async () => {
    if (!postUrl) {
      alert('Paste LinkedIn post URL')
      return
    }

    setLoading(true)

    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign_id: CAMPAIGN_ID,
        post_url: postUrl,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || 'Submission failed')
      setLoading(false)
      return
    }

    setSubmissions(prev => [data, ...prev])
    setPostUrl('')
    setLoading(false)
  }

  /* ================= RENDER ================= */
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Submit LinkedIn Content</h1>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Paste your LinkedIn post URL
        </label>
        <input
          type="url"
          placeholder="https://www.linkedin.com/posts/..."
          value={postUrl}
          onChange={e => setPostUrl(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        onClick={submitContent}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Submitting…' : 'Submit Content'}
      </button>

      {/* Submissions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>

        {submissions.length === 0 && (
          <p className="text-gray-500">No submissions yet.</p>
        )}

        <div className="space-y-6">
          {submissions.map(s => {
            if (!s.post_url) return null

            // Extract LinkedIn post ID
            const match = s.post_url.match(/activity-(\d+)/)
            const postId = match ? match[1] : null
            if (!postId) return null

            return (
              <div key={s.id} className="border rounded-lg p-4 bg-white shadow">
                <iframe
                  src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}`}
                  height="650"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="LinkedIn Post"
                ></iframe>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(s.submitted_at).toLocaleString()}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
